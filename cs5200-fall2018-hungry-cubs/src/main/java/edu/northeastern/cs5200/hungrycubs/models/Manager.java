package edu.northeastern.cs5200.hungrycubs.models;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Manager extends User {


	
    @ManyToOne
    @JsonIgnore
    private Restaurant restaurant;
    
    public Restaurant getRestaurant()
    {
    	return restaurant;
    }
    
    public void setRestaurant(Restaurant restaurant)
    {
    	this.restaurant = restaurant;
    }
	
}
