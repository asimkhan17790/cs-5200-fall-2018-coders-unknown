package edu.northeastern.cs5200.hungrycubs.models;



import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
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
    
    @OneToMany(mappedBy="user")
    private List<Address> addresses;
    
    @OneToMany(mappedBy="user")
    private List<Phone> phones;
   
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

	public List<Address> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}
	
	public List<Phone> getPhones() {
		return phones;
	}

	public void setPhones(List<Phone> phones) {
		this.phones = phones;
	}
	
	public void addAddress(Address address)
	{
		if(addresses == null)
			addresses = new ArrayList<>();
		addresses.add(address);
	}
	
	public void removeAddress(Address address)
	{
		addresses.remove(address);
	}
	
	public void updateAddress(Address address)
	{
		for(Address add: getAddresses())
		{
			if(add.getId() == address.getId())
			{
				add = address;
				break;
			}
		}
	}
	
	public void updatePhone(Phone phone)
	{
		for(Phone ph: getPhones())
		{
			if(ph.getId() == phone.getId())
			{
				ph = phone;
				break;
			}
		}
	}
	
	
	
	public void addPhone(Phone phone)
	{
		if(phones == null)
			phones = new ArrayList<>();
		phones.add(phone);
	}
	
	public void removePhone(Phone phone)
	{
		phones.remove(phone);
	}
	
	public void removeAddressById(int addressId)
	{
		for(Address add : getAddresses())
		{
			if(add.getId() == addressId)
			{
				addresses.remove(add);
				break;
			}
		}
	}
	
	public void removePhoneById(int phoneId)
	{
		for(Phone ph : getPhones())
		{
			if(ph.getId() == phoneId)
			{
				phones.remove(ph);
				break;
			}
		}
	}
}
