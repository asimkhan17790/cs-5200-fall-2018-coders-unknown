package edu.northeastern.cs5200.hungrycubs.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Customer extends User {

	@OneToMany(mappedBy="customer", orphanRemoval=true)
	List<Order> orders;

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
	
}
