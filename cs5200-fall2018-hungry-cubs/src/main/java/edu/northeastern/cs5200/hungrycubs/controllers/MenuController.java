	package edu.northeastern.cs5200.hungrycubs.controllers;

	import java.io.BufferedReader;
	import java.io.InputStreamReader;
import java.util.List;

import org.apache.http.HttpResponse;
	import org.apache.http.client.methods.HttpGet;
	import org.apache.http.impl.client.DefaultHttpClient;
	import org.json.simple.JSONArray;
	import org.json.simple.JSONObject;
	import org.json.simple.parser.JSONParser;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.hungrycubs.daos.ItemDao;
import edu.northeastern.cs5200.hungrycubs.daos.MenuDao;
import edu.northeastern.cs5200.hungrycubs.daos.RestaurantDao;
import edu.northeastern.cs5200.hungrycubs.models.Item;
import edu.northeastern.cs5200.hungrycubs.models.Menu;
import edu.northeastern.cs5200.hungrycubs.models.Restaurant;

	@RestController
	public class MenuController {
		
		@Autowired
		private RestaurantDao dao;
		@Autowired
		private MenuDao menuDao;
		@Autowired
		private ItemDao itemDao;

		@GetMapping("/dump/menu")
		public void getMenu()
		{
			List<Restaurant> restaurants = dao.findAll();
			 try {
					DefaultHttpClient httpClient = new DefaultHttpClient();
					
					for(int i=0; i<restaurants.size(); i++)
					{
					
						String apiKey = restaurants.get(i).getApiKey();
						Restaurant rest = restaurants.get(i);
					HttpGet getRequest = new HttpGet(
						"https://api.eatstreet.com/publicapi/v1/restaurant/" + apiKey + "/menu?access-token=918ad90b88e76305");
					getRequest.addHeader("accept", "application/json");
					//getRequest.addHeader("X-Access-Token","1f352f2328accea4");
					
					
					HttpResponse response = httpClient.execute(getRequest);

					if (response.getStatusLine().getStatusCode() != 200) {
						throw new RuntimeException("Error : HTTP error code : "
						   + response.getStatusLine().getStatusCode());
					}

					BufferedReader br = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));

					String output;
					JSONArray menus = null;

					while ((output = br.readLine()) != null) {
						try {
							JSONParser parser = new JSONParser();
							menus = (JSONArray)parser.parse(output);
						}
						catch(Exception e)
						{
							e.printStackTrace();
						}
						
					}
					//For menus of restaurant
					for(int j=0; j<menus.size();j++)
					{
						JSONObject menuJson = (JSONObject) menus.get(j);
						Menu menu = new Menu(menuJson.get("apiKey").toString(),menuJson.get("name").toString());
						menuDao.createMenuForRestaurant(rest, menu);
						
						JSONArray items = (JSONArray) menuJson.get("items");
						
						for(int k=0; k<items.size(); k++)
						{
							JSONObject jsonI = (JSONObject) items.get(k);
							@SuppressWarnings("unchecked")
							Item item = new Item(jsonI.get("apiKey").toString(),jsonI.get("name").toString(), 
									jsonI.getOrDefault("description", " ").toString(),
												Double.parseDouble(jsonI.get("basePrice").toString()));
							itemDao.createItemForMenu(menu, item);
							
						}
						
					}
					}
					httpClient.getConnectionManager().shutdown();
				  } 
			 catch (Exception e)
			 		{
					  e.printStackTrace();
			 		}
		}
		
	}
