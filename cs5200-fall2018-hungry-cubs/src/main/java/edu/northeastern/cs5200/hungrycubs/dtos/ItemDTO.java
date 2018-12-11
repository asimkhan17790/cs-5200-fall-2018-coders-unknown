package edu.northeastern.cs5200.hungrycubs.dtos;


public class ItemDTO {

	private int id;
	private String apiKey;
	private String name;
	private String description;
	private Double basePrice;
	private int menu_id;
	
	public ItemDTO()
	{
		
	}

	public ItemDTO(int id, String apiKey, String name, String description, Double basePrice, int menu_id) {
		super();
		this.apiKey = apiKey;
		this.name = name;
		this.description = description;
		this.basePrice = basePrice;
		this.menu_id = menu_id;
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

	public int getMenu_id() {
		return menu_id;
	}

	public void setMenu_id(int menu_id) {
		this.menu_id = menu_id;
	}
	
	 
}
