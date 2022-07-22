package Model;

import Model.branch;

import java.sql.*;
import java.util.*;

class BranchResponse {
    public String message;

    public BranchResponse(String message) {
        this.message = message;
    }
}

public class Branchdatabase {
    private static Connection con;
    private static String to_SQL_string(String s)
    {
        return "'"+s+"'";
    }

    private static void commit()
    {
        try{
            Statement s=con.createStatement();
            s.execute("Commit");
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void add_branch(PreparedStatement query)
    {
        try{
            Statement s=con.createStatement();
            int status=s.executeUpdate(String.valueOf(query));
            commit();
        }
        catch(Exception e){
            System.out.println("Error in Branch creation: "+e);
        }
    }

    public static void modify_branch(PreparedStatement query) {
        try {
            Statement s = con.createStatement();
            int query_status = s.executeUpdate(String.valueOf(query));
            commit();
        } catch (Exception e) {
            System.out.println("Error in branch modification: " + e);
        }
    }

    public static List<Integer> get_ids() {
        List<Integer> ids = new ArrayList<>();
        int i = 0;
        try {
            Statement smt = con.createStatement();
            ResultSet rs = smt.executeQuery("Select id from branch");
            while (rs.next()) {
                ids.add(rs.getInt("id"));
            }
        } catch (Exception e) {
            System.out.println("Error fetching branch IDs: " + e);
        } finally {
            if (con != null) {
                try {
                    con.close();
                } catch (SQLException ignored) {
                }
            }
        }
        return ids;
    }

    public static ArrayList<Object> get_branch_details(String query)
    {
        ArrayList<Object>query_result=new ArrayList<Object>();
        try{
            Statement smt=con.createStatement();
            ResultSet rs=smt.executeQuery(query);
            while(rs.next()) {
                branch t = new branch
                        (rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("address")
                );
                query_result.add(t);
            }
        }
        catch(Exception e)
        {
            System.out.println("Error fetching branch report: "+e);
        }
        return query_result;
    }


}
