package edu.northeastern.cs5200.hungrycubs.controllers;

import edu.northeastern.cs5200.hungrycubs.models.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

public class UserController {


    private List<User> users = new ArrayList<>();

    @RequestMapping(value = "/api/user/register", headers = "Accept=application/json")
    public User register(@RequestBody User user, HttpSession session) {

        // TODO : Gautam add Db code
        session.setAttribute(user.getUsername(), user);

        users.add(user);
        return user;
    }

    @RequestMapping(value="/api/user/login", method= RequestMethod.POST, headers = "Accept=application/json")
    public User login(	@RequestBody User credentials,
                          HttpSession session) {
        for (User user : users) {
            if( user.getUsername().equals(credentials.getUsername())
                    && user.getPassword().equals(credentials.getPassword())) {
                session.setAttribute(credentials.getUsername(), user);
                return user; 
            }
        }
        return null;
    }

    @RequestMapping(value = "/api/user/logout")
    public void logout
            (HttpSession session) {
        session.invalidate();
    }
}
