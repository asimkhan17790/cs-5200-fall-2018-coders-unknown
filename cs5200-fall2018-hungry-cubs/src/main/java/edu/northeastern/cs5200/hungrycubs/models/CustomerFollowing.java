package edu.northeastern.cs5200.hungrycubs.models;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomerFollowing {
	@Id
	@GeneratedValue
		(strategy=GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JsonIgnore
	Customer follower;
	
	@ManyToOne
	@JsonIgnore
	Customer following;
	
	@Column(name = "timestamp", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Timestamp timestamp;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Customer getFollower() {
		return follower;
	}

	public void setFollower(Customer follower) {
		this.follower = follower;
	}

	public Customer getFollowing() {
		return following;
	}

	public void setFollowing(Customer following) {
		this.following = following;
	}

}
