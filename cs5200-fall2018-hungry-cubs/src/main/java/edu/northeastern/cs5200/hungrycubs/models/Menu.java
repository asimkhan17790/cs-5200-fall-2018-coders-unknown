package edu.northeastern.cs5200.hungrycubs.models;

import java.util.ArrayList;
import java.util.List;
import edu.northeastern.cs5200.hungrycubs.models.Item;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Menu {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	private String apiKey;
	
	@OneToMany(mappedBy="menu", orphanRemoval=true)
	private List<Item> items;
	
	@ManyToOne
	@JsonIgnore
	private Restaurant restaurant;
	
	public Menu()
	{
		
	}

	public Menu(String apiKey, String name) {
		super();
		this.name = name;
		this.apiKey = apiKey;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}
	
	public void addItem(Item item)
	{
		if(items == null)
			items = new ArrayList<>();
		items.add(item);
	}
	
	public void removeItem(Item item)
	{
		items.remove(item);
	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}
	
	public Restaurant getRestaurant()
	{
		return restaurant;
	}
	
	public void setRestaurant(Restaurant rest)
	{
		restaurant = rest;
	}
	
	
	
}
