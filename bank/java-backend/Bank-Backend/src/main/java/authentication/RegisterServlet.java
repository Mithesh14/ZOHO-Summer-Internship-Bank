package authentication;

import Utility.BodyReader;
import Utility.Database;
import com.google.gson.Gson;
import javax.servlet.annotation.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.security.NoSuchAlgorithmException;
import java.sql.*;

class RegisterCredentials {
    public String name;
    public String password;
    public String phoneNumber;
    public String address;
    public int role;

    public RegisterCredentials(String name, String password, String phoneNumber, String address, int role) {
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.role = role;
    }
}

class RegisterResponse {
    public String message;

    public RegisterResponse(String message) {
        this.message = message;
    }
}

@WebServlet("/authentication/register")
public class RegisterServlet extends HttpServlet{
    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();

        @Override
        protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
            String body = BodyReader.read(req);
            RegisterCredentials data = gson.fromJson(body, RegisterCredentials.class);

            Connection connection;
            PreparedStatement statement;

        try {
            connection = Database.getConnection();

            statement = connection.prepareStatement("INSERT INTO users(name, phone_num, password, address, role) VALUES (?, ?, ?, ?, ?)");

            statement.setString(1, data.name);
            statement.setString(2, data.phoneNumber);
            statement.setString(3, Database.hashPassword(data.password));
            statement.setString(4, data.address);
            statement.setInt(5,    data.role);

            statement.execute();

            RegisterResponse response = new RegisterResponse("Register Success");
            String json = this.gson.toJson(response);
            PrintWriter out = res.getWriter();
            res.setContentType("application/json");
            out.print(json);
            out.flush();
        }
        catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
