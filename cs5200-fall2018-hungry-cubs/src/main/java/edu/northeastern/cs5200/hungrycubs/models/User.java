package edu.northeastern.cs5200.hungrycubs.models;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
	
	public User()
	{
		
	}

	public User(String firstName, String lastName, String username, String password, String dType) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.password = password;
		this.dType = dType;
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String firstName;
	private String lastName;
	
    private String username;
    private String password;
    
    
    private String dType;
   
    public String getdType() {
		return dType;
	}

	public void setdType(String dType) {
		this.dType = dType;
	}

	@Transient
    private String restaurantKey;
    
    @Transient
    public String getRestaurantKey()
    {
    	return restaurantKey;
    }
    @Transient
    public void setRestaurantKey(String restaurantKey)
    {
    	this.restaurantKey = restaurantKey;
    }
    

    public int getId() {
		return id;
	}

	public  void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
