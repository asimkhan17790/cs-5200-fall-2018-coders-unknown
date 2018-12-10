package edu.northeastern.cs5200.hungrycubs.dtos;


// POJO To search Restaurant

public class InputRestaurant {
	
	private String streetAddress;
	private String latitude;
	private String longitude;
	private String pickUpRadius;
	private String search;
	
	public String getStreetAddress() {
		return streetAddress;
	}
	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getPickUpRadius() {
		return pickUpRadius;
	}
	public void setPickUpRadius(String pickUpRadius) {
		this.pickUpRadius = pickUpRadius;
	}
	public String getSearch() {
		return search;
	}
	public void setSearch(String search) {
		this.search = search;
	}

}
