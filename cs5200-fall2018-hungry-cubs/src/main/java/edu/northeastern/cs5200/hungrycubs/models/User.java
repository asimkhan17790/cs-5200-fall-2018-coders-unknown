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

	public User(String firstName, String lastName, String username, String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.password = password;
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String firstName;
	private String lastName;
	
    private String username;
    private String password;
    
    
    @Transient
    private int restaurantKey;
    
    @Transient
    public int getRestaurantKey()
    {
    	return restaurantKey;
    }
    @Transient
    public void setRestaurantKey(int restId)
    {
    	restaurantKey = restId;
    }
    
    @Transient
    private String dType;
    
    @Transient
    public String getDType()
    {
    	return dType;
    }
    
    @Transient
    public void setDType(String dType)
    {
    	this.dType = dType;
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
