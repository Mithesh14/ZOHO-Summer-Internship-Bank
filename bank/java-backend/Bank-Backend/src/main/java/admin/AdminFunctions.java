package admin;

import Model.Branchdatabase;
import Utility.BranchCredentials;
import Utility.Database;


import java.sql.*;
import java.util.*;

public class AdminFunctions {

    private static Object data;

    //Having access to branch database
    private static String to_SQL_string(String s) {
    return "'"+s+"'";
    }

    public static ArrayList<Object> getAllBranch() throws SQLException {
        Connection connection;
        PreparedStatement statement;
        connection = Database.getConnection();
        String query="Select * from branch";
        return Branchdatabase.get_branch_details(query);
    }

    public static void addBranch(BranchCredentials t) throws SQLException {
        Connection connection;
        PreparedStatement statement;
        connection = Database.getConnection();
        statement = connection.prepareStatement("INSERT INTO branch(name, address) VALUES (?, ?)");

        statement.setString(1, data.name);
        statement.setString(2, data.phoneNumber);
        statement.setString(3, Database.hashPassword(data.password));
        statement.setString(4, data.address);
        statement.setInt(5,    data.role);

        statement.execute();


        Branchdatabase.add_branch(statement);
    }

    public static void modifyBranchName(int id, String name) throws SQLException {
        Connection connection;
        PreparedStatement statement;
        connection = Database.getConnection();
        String query="update branch set ";
        query+="name="+to_SQL_string(name);
        query+=" where id="+id;
        System.out.println(query);
        Branchdatabase.modify_branch(query);
    }

    public static void modifyBranchAddress(int id, String address) throws SQLException {
        Connection connection;
        PreparedStatement statement;
        connection = Database.getConnection();
        String query="update branch set ";
        query+="address="+to_SQL_string(address);
        query+=" where id="+id;
        System.out.println(query);
        Branchdatabase.modify_branch(query);
    }

    //
}
