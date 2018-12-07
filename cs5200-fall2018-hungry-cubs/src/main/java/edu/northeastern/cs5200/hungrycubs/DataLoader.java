package edu.northeastern.cs5200.hungrycubs;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.northeastern.cs5200.hungrycubs.daos.RestaurantDao;
import edu.northeastern.cs5200.hungrycubs.models.Address;
import edu.northeastern.cs5200.hungrycubs.models.Restaurant;

import org.json.simple.JSONArray;


@Component
public class DataLoader {
	
	@Autowired
	private RestaurantDao dao;
	
	public static void main(String[] args) {
		DataLoader dl = new DataLoader();
		dl.loadData();
	}
	
	public void loadData()
	{
		  try {

			DefaultHttpClient httpClient = new DefaultHttpClient();
			HttpGet getRequest = new HttpGet(
				"https://api.eatstreet.com/publicapi/v1/restaurant/search?access-token=918ad90b88e76305&street-address=boston");
			getRequest.addHeader("accept", "application/json");
			
			HttpResponse response = httpClient.execute(getRequest);

			if (response.getStatusLine().getStatusCode() != 200) {
				throw new RuntimeException("Error with Http Code: "
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
			JSONObject jsonObj = (JSONObject)restaurants.get(1);
			System.out.println(jsonObj);
			
			ObjectMapper objectMapper = new ObjectMapper();
			
			Restaurant rest = objectMapper.readValue(jsonObj.toString(), Restaurant.class);
			Address address = new Address(jsonObj.get("city").toString(), jsonObj.get("state").toString(),
										jsonObj.get("zip").toString(), jsonObj.get("streetAddress").toString());
			dao.createRestaurant(rest);
			dao.attachAddToRest(rest, address);
			
			httpClient.getConnectionManager().shutdown();
		  } catch (Exception e) {
			e.printStackTrace();
		  } 
		}
}

