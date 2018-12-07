package edu.northeastern.cs5200.hungrycubs.models;

import javax.persistence.*;

@Entity
public class Address {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String city;
	private String state;
	private String zip;
	private String streetAddress;
	
	@ManyToOne
	private Restaurant restaurant;
	
	public Address()
	{
		
	}

	public Address(String city, String state, String zip, String streetAddress) {
		super();
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.streetAddress = streetAddress;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getStreetAddress() {
		return streetAddress;
	}

	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	
	
	
}
