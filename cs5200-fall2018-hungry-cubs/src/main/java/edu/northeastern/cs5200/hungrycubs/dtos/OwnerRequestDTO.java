package edu.northeastern.cs5200.hungrycubs.dtos;

public class OwnerRequestDTO {

	int ownerId;
	private String restaurantKey;
	private String restaurantName;
	private String username;
	private String firstName;
	private String lastName;
	
	public OwnerRequestDTO()
	{
		
	}
	
	public OwnerRequestDTO(int ownerId, String restaurantKey, String restaurantName, String username, String firstName,
			String lastName) {
		super();
		this.ownerId = ownerId;
		this.restaurantKey = restaurantKey;
		this.restaurantName = restaurantName;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public int getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(int ownerId) {
		this.ownerId = ownerId;
	}

	public String getRestaurantKey() {
		return restaurantKey;
	}

	public void setRestaurantKey(String restaurantKey) {
		this.restaurantKey = restaurantKey;
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

}
