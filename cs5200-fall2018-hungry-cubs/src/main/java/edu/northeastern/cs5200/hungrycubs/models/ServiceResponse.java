package edu.northeastern.cs5200.hungrycubs.models;

import java.io.Serializable;

/**
 * @author Asim
 *
 * A generic response object defined to return generic response for the API Controllers
 *
 */
public class ServiceResponse implements Serializable{

	private static final long serialVersionUID = 1L;

	private String status;
	private String description;

	// Data field holds the actual data in whose context the response object is being used
	private Object data;
	private String token;
	private String refreshToken;


	public String getRefreshToken() {
		return refreshToken;
	}
	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}


}
