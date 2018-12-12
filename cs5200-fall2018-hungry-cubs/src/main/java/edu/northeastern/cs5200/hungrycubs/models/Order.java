package edu.northeastern.cs5200.hungrycubs.models;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="FOOD_ORDER")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String totalPrice;
	
	@JsonIgnore
	@ManyToOne
	private Customer customer;
	@JsonIgnore
	@ManyToOne
	private Restaurant restaurant;
	
	
	@Column(name = "timestamp", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Timestamp timestamp;
	
	@JsonIgnore
	@ManyToOne
	private Address address;
	@JsonIgnore
	@ManyToOne
	private Phone phone; 
	
//	private int restaurantId;
//	private int customerId;
//	private int deliveryBoyId;
	
	@JsonIgnore
	@ManyToOne
	private DeliveryBoy deliveryBoy;
	
	private String orderStatus;
	
	@Transient
	private List<Item> items;
	
	@Transient
	private String restaurantKey;
	
	public Order()
	{
		
	}
	
	public Order(String orderStatus, String totalPrice)
	{
		this.orderStatus = orderStatus;
//		this.restaurantId = restaurantId;
//		this.customerId = customerId;
//		this.deliveryBoyId = deliveryBoyId;
		this.totalPrice = totalPrice;
	}

//	public int getRestaurantId() {
//		return restaurantId;
//	}
//
//	public void setRestaurantId(int restaurantId) {
//		this.restaurantId = restaurantId;
//	}
//
//	public int getCustomerId() {
//		return customerId;
//	}
//
//	public void setCustomerId(int customerId) {
//		this.customerId = customerId;
//	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

//	public int getDeliveryBoyId() {
//		return deliveryBoyId;
//	}
//
//	public void setDeliveryBoyId(int deliveryBoyId) {
//		this.deliveryBoyId = deliveryBoyId;
//	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public String getRestaurantKey() {
		return restaurantKey;
	}

	public void setRestaurantKey(String restaurantKey) {
		this.restaurantKey = restaurantKey;
	}

	public String getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(String totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	
	public DeliveryBoy getDeliveryBoy()
	{
		return deliveryBoy;
	}
	
	public void setDeliveryBoy(DeliveryBoy deliveryBoy)
	{
		this.deliveryBoy = deliveryBoy;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Phone getPhone() {
		return phone;
	}

	public void setPhone(Phone phone) {
		this.phone = phone;
	}
}
