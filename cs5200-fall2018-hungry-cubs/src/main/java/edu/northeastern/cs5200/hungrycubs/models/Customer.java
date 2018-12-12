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
	
	@OneToMany(mappedBy="customer", orphanRemoval=true)
	List<Review> reviews;
	
	@OneToMany(mappedBy="follower")
	List<CustomerFollowing> followings;
	
	@OneToMany(mappedBy="following")
	List<CustomerFollowing> followers;

	public List<Review> getReviews() {
		return reviews;
	}

	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
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
	
	public void addReview(Review review)
	{
		if(reviews == null)
			reviews = new ArrayList<>();
		reviews.add(review);
	}

	public List<CustomerFollowing> getFollowings() {
		return followings;
	}

	public void setFollowings(List<CustomerFollowing> followings) {
		this.followings = followings;
	}

	public List<CustomerFollowing> getFollowers() {
		return followers;
	}

	public void setFollowers(List<CustomerFollowing> followers) {
		this.followers = followers;
	}
	
	public void addFollowing(CustomerFollowing custFoll)
	{
		if(followings == null)
			followings = new ArrayList<>();
		followings.add(custFoll);
	}
	
	public void removeFollowing(CustomerFollowing custFoll)
	{
		followings.remove(custFoll);
	}
	
	public void addFollower(CustomerFollowing custFoll)
	{
		if(followers == null)
			followers = new ArrayList<>();
		followers.add(custFoll);
	}
	
	public void removeFollower(CustomerFollowing custFoll)
	{
		followers.remove(custFoll);
	}
	
}
