package Model;

import java.sql.*;

public class branch {
    int id;
    String name;
    String address;
    public branch(int id, String name, String address)
    {
        this.id=id;
        this.name=name;
        this.address=address;
    }

    public int getID()
    {
        return id;
    }
    public String getName()
    {
        return name;
    }
    public String getAddress()
    {
        return address;
    }
}