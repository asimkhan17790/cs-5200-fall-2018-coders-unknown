package edu.northeastern.cs5200.hungrycubs.models;

import javax.persistence.*;

@Entity
public class Phone {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String phone;
	@ManyToOne
	private Restaurant restaurant;
	
	public Phone()
	{
		
	}
	
	public Phone(String phone) {
		super();
		this.phone = phone;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Restaurant getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	
	
	

}
