package edu.northeastern.cs5200.hungrycubs.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class DeliveryBoy extends User {
	
	private String status;

	@OneToMany(mappedBy="deliveryBoy", orphanRemoval=true)
	private List<Order> orders;
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}	
	
	public void addOrder(Order order)
	{
		if(orders == null)
			orders = new ArrayList<>();
		orders.add(order);
	}
	
	public void removeOrder(Order order)
	{
		orders.remove(order);
	}

}
