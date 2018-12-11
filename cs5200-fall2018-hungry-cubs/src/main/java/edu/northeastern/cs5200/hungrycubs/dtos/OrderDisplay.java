package edu.northeastern.cs5200.hungrycubs.dtos;

public class OrderDisplay {

	
	private int id;
	private String totalPrice;
	private String restaurantName;
	private String username;
	private String address;
	private String phone;
	
	public OrderDisplay()
	{
		
	}
	
	public OrderDisplay(int id)
	{
		this.id = id;
	}
	
	public OrderDisplay(int id, String totalPrice, String restaurantName, String username, String address,
			String phone) {
		super();
		this.id = id;
		this.totalPrice = totalPrice;
		this.restaurantName = restaurantName;
		this.username = username;
		this.address = address;
		this.phone = phone;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(String totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getRestaurantName() {
		return restaurantName;
	}
	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	
	
}
