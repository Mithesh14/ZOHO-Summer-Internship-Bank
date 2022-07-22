package authentication;

import Utility.BodyReader;
import Utility.Database;
import com.google.gson.Gson;
import javax.servlet.annotation.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.beans.Statement;
import java.io.*;
import java.security.NoSuchAlgorithmException;
import java.sql.*;
import java.util.stream.Collectors;

class LoginCredientials {
    public String password;
    public String phoneNumber;

    public LoginCredientials(String phoneNumber, String password){
        this.password= password;
        this.phoneNumber= phoneNumber;

    }
}

class LoginResponse {
    public String message;

    public LoginResponse(String message) {
        this.message = message;
    }
}

@WebServlet("/authentication/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        String body = BodyReader.read(req);
        LoginCredientials data = gson.fromJson(body, LoginCredientials.class);
        LoginResponse response;
        Connection connection;
        PreparedStatement statement;
        ResultSet result;

        try {
            if(data.phoneNumber.isEmpty() || data.password.isEmpty()) {
                response = new LoginResponse("CREDENTIALS_EMPTY");
            }
            else {
                connection = Database.getConnection();

                statement = connection.prepareStatement("SELECT password FROM users WHERE phone_num = ?");
                statement.setString(1, data.phoneNumber);
                result = statement.executeQuery();

                if (result.next()) {
                    String hash = result.getString(1);

                    if(hash.equalsIgnoreCase(Database.hashPassword(data.password))) {
                        response = new LoginResponse("LOGIN_SUCCESSFUL");
                        // should generate JWT here and set it in cookie
                        Cookie tokenCookie = new Cookie("token", "dummy_value");
                        tokenCookie.setMaxAge(24 * 60 * 60);
                        res.addCookie(tokenCookie);
                    }
                    else {
                        response = new LoginResponse("WRONG_PASSWORD");
                    }

                } else {
                    response = new LoginResponse("USER_NOT_REGISTERED");
                }
            }

            res.setContentType("application/json");
            PrintWriter out = res.getWriter();
            out.print(this.gson.toJson(response));
            out.flush();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } finally {

        }
    }

}