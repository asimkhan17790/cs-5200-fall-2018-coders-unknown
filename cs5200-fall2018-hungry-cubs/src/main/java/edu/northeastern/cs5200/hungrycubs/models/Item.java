package edu.northeastern.cs5200.hungrycubs.models;

import javax.persistence.*;

@Entity
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String apiKey;
	private String name;
	@Column(columnDefinition="TEXT")
	private String description;
	private Double basePrice;
	
	@ManyToOne
	private Menu menu;
	
	public Item()
	{
		
	}

	public Item(String apiKey, String name, String description, Double basePrice) {
		super();
		this.apiKey = apiKey;
		this.name = name;
		this.description = description;
		this.basePrice = basePrice;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getBasePrice() {
		return basePrice;
	}

	public void setBasePrice(Double basePrice) {
		this.basePrice = basePrice;
	}

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}
	
	 
}
