package edu.northeastern.cs5200.hungrycubs.controllers;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.northeastern.cs5200.hungrycubs.daos.AssignmentDao;
import edu.northeastern.cs5200.hungrycubs.daos.OwnerDao;
import edu.northeastern.cs5200.hungrycubs.daos.RestaurantDao;
import edu.northeastern.cs5200.hungrycubs.dtos.InputRestaurant;
import edu.northeastern.cs5200.hungrycubs.models.Address;
import edu.northeastern.cs5200.hungrycubs.models.Owner;
import edu.northeastern.cs5200.hungrycubs.models.Phone;
import edu.northeastern.cs5200.hungrycubs.models.Restaurant;

@RestController
public class RestaurantController {

	@Autowired
	private RestaurantDao dao;
	@Autowired
	private OwnerDao ownerDao;
	@Autowired
	private AssignmentDao assignmentDao;

	// Restaurant Details From DB
	@RequestMapping(value = "/api/restaurant/{restaurantKey}")
	public Restaurant getRestaurant(@PathVariable("restaurantKey") String restaurantKey) {
		Integer restaurantId = dao.getIdByKey(restaurantKey);
		if (restaurantId == null)
			return new Restaurant(0);
		return dao.findById(restaurantId);
	}

	// Restaurant From API
	@RequestMapping(value = "/api/restaurant/search", headers = "Accept=application/json")
	public List<Restaurant> searchRestaurants(@RequestBody InputRestaurant restaurant) {

		List<Restaurant> restaurantList = new ArrayList<>();

		try {

			String url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?access-token=918ad90b88e76305";

			if (restaurant.getLatitude() != null)
				url += "&latitude=" + restaurant.getLatitude();
			else
				url += "&latitude=42.3600825";
			if (restaurant.getLongitude() != null)
				url += "&longitude=" + restaurant.getLongitude();
			else
				url += "&longitude=-71.0588801";
			if (restaurant.getPickUpRadius() != null)
				url += "&pickup-radius=" + restaurant.getPickUpRadius();
			if (restaurant.getStreetAddress() != null) {
				String streetAdd = restaurant.getStreetAddress().replace(" ", "%20");
				url += "&street-address=" + streetAdd;
			}
			if (restaurant.getSearch() != null) {
				String searchText = restaurant.getSearch().replace(" ", "%20");
				url += "&search=" + searchText;
			}

			DefaultHttpClient httpClient = new DefaultHttpClient();
			HttpGet getRequest = new HttpGet(url);
			getRequest.addHeader("accept", "application/json");

			HttpResponse response = httpClient.execute(getRequest);

			if (response.getStatusLine().getStatusCode() != 200) {
				throw new RuntimeException("Error : HTTP error code : " + response.getStatusLine().getStatusCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));

			String output;
			JSONObject json = null;
			JSONArray restaurants = null;

			while ((output = br.readLine()) != null) {
				try {
					JSONParser parser = new JSONParser();
					json = (JSONObject) parser.parse(output);
					restaurants = (JSONArray) json.get("restaurants");
				} catch (Exception e) {
					e.printStackTrace();
				}

			}

			System.out.println("Number of restaurants found:" + restaurants.size());

			int index = 0;
			while (index < restaurants.size()) {
				JSONObject jsonObj = (JSONObject) restaurants.get(index);
				System.out.println(jsonObj);

				ObjectMapper objectMapper = new ObjectMapper();

				Restaurant rest = objectMapper.readValue(jsonObj.toString(), Restaurant.class);

				restaurantList.add(rest);
				index++;
			}

			httpClient.getConnectionManager().shutdown();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return restaurantList;
	}

	// Restaurant From Db
	@GetMapping("/api/restaurant/db/lazy")
	public List<Restaurant> findAllLazy() {
		return dao.findAllLazy();
	}

	@RequestMapping(value = "/api/user/owner/restaurants/{ownerId}")
	public List<Restaurant> getRestaurantsForOwner(@PathVariable("ownerId") int ownerId) {
		List<Restaurant> restaurants = new ArrayList<>();
		List<Integer> restaurantIds = dao.getRestaurantIdForOwner(ownerId);
		for (Integer restaurantId : restaurantIds) {
			restaurants.add(dao.findById(restaurantId));
		}
		return restaurants;
	}

	@RequestMapping(value = "/api/user/{ownerId}/own/restaurant/{restaurantKey}")
	public Boolean assignRestaurantToOwner(@PathVariable("ownerId") int ownerId,
			@PathVariable("restaurantKey") String restaurantKey) {
		Owner owner = ownerDao.findById(ownerId);
		assignmentDao.assignOwnerToRestaurant(owner, dao.getIdByKey(restaurantKey));
		return true;
	}

	@GetMapping("/dump")

	public void getRestaurants() {
		try {


			DefaultHttpClient httpClient = new DefaultHttpClient();
			HttpGet getRequest = new HttpGet(
			//		"https://api.eatstreet.com/publicapi/v1/restaurant/search?access-token=918ad90b88e76305&street-address=boston&search=Village%20Pizza%20House");
			 "https://api.eatstreet.com/publicapi/v1/restaurant/search?access-token=918ad90b88e76305&street-address=boston");
			getRequest.addHeader("accept", "application/json");

			HttpResponse response = httpClient.execute(getRequest);

			if (response.getStatusLine().getStatusCode() != 200) {
				throw new RuntimeException("Error : HTTP error code : " + response.getStatusLine().getStatusCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));

			String output;
			JSONObject json = null;
			JSONArray restaurants = null;

			while ((output = br.readLine()) != null) {
				try {
					JSONParser parser = new JSONParser();
					json = (JSONObject) parser.parse(output);
					restaurants = (JSONArray) json.get("restaurants");
				} catch (Exception e) {
					e.printStackTrace();
				}

			}

			System.out.println("Number of restaurants found:" + restaurants.size());

			int index = 0;
			while (index < restaurants.size()) {
				JSONObject jsonObj = (JSONObject) restaurants.get(index);
				System.out.println(jsonObj);

				ObjectMapper objectMapper = new ObjectMapper();

				Restaurant rest = objectMapper.readValue(jsonObj.toString(), Restaurant.class);
				Address address = objectMapper.readValue(jsonObj.toString(), Address.class);
				Phone phone = objectMapper.readValue(jsonObj.toString(), Phone.class);

				dao.createRestaurant(rest);
				dao.attachAddToRest(rest, address);
				dao.attachPhoneToRest(rest, phone);
				index++;
			}

			httpClient.getConnectionManager().shutdown();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
