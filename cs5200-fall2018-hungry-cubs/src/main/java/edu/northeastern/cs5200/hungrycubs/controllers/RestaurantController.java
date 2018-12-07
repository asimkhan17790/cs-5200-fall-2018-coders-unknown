package edu.northeastern.cs5200.hungrycubs.controllers;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.northeastern.cs5200.hungrycubs.daos.RestaurantDao;
import edu.northeastern.cs5200.hungrycubs.models.Address;
import edu.northeastern.cs5200.hungrycubs.models.Phone;
import edu.northeastern.cs5200.hungrycubs.models.Restaurant;

@RestController
public class RestaurantController {
	
	@Autowired
	private RestaurantDao dao;

	@GetMapping("/dump")
	public void getRestaurants()
	{
		 try {

				DefaultHttpClient httpClient = new DefaultHttpClient();
				HttpGet getRequest = new HttpGet(
						"https://api.eatstreet.com/publicapi/v1/restaurant/search?access-token=918ad90b88e76305&latitude=42&longitude=-71");
					//"https://api.eatstreet.com/publicapi/v1/restaurant/search?access-token=918ad90b88e76305&street-address=boston");
				getRequest.addHeader("accept", "application/json");
				
				HttpResponse response = httpClient.execute(getRequest);

				if (response.getStatusLine().getStatusCode() != 200) {
					throw new RuntimeException("Error : HTTP error code : "
					   + response.getStatusLine().getStatusCode());
				}

				BufferedReader br = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));

				String output;
				JSONObject json = null;
				JSONArray restaurants = null;

				while ((output = br.readLine()) != null) {
					try {
					JSONParser parser = new JSONParser();
					json = (JSONObject)parser.parse(output);
					restaurants = (JSONArray)json.get("restaurants");
					}
					catch(Exception e)
					{
						e.printStackTrace();
					}
					
				}
				
				
				System.out.println("Number of restaurants found:" + restaurants.size());
				
				int index = 0;
				while(index < restaurants.size())
				{
					JSONObject jsonObj = (JSONObject)restaurants.get(index);
					System.out.println(jsonObj);
					
					ObjectMapper objectMapper = new ObjectMapper();
					
					Restaurant rest = objectMapper.readValue(jsonObj.toString(), Restaurant.class);
//					Address address = new Address(jsonObj.get("city").toString(), jsonObj.get("state").toString(),
//												jsonObj.get("zip").toString(), jsonObj.get("streetAddress").toString());
//					Phone phone = new Phone(jsonObj.get("phone").toString());
					
					Address address = objectMapper.readValue(jsonObj.toString(), Address.class);
					Phone phone = objectMapper.readValue(jsonObj.toString(), Phone.class);
					
					dao.createRestaurant(rest);
					dao.attachAddToRest(rest, address);
					dao.attachPhoneToRest(rest, phone);	
					index++;
				}

				httpClient.getConnectionManager().shutdown();

			  } 
		 catch (Exception e)
		 		{
				  e.printStackTrace();
		 		}
	}
	
}
