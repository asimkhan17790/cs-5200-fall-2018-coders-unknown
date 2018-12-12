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
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

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

	// Menu From API
	@GetMapping(value = "/api/restaurant/menu/{apiKey}")
	public List<Menu> searchMenus(@PathVariable("apiKey") String apiKey) {
		List<Menu> menus = new ArrayList<>();
		try {
			DefaultHttpClient httpClient = new DefaultHttpClient();
			String url = "https://api.eatstreet.com/publicapi/v1/restaurant/" + apiKey
					+ "/menu?access-token=918ad90b88e76305";
			HttpGet getRequest = new HttpGet(url);
			getRequest.addHeader("accept", "application/json");
			HttpResponse response = httpClient.execute(getRequest);

			if (response.getStatusLine().getStatusCode() != 200) {
				throw new RuntimeException("Error : HTTP error code : " + response.getStatusLine().getStatusCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));
			String output;
			JSONArray menuArray = null;

			while ((output = br.readLine()) != null) {
				try {
					JSONParser parser = new JSONParser();
					menuArray = (JSONArray) parser.parse(output);
				} catch (Exception e) {
					e.printStackTrace();
				}

			}

			ObjectMapper objectMapper = new ObjectMapper();

			menus = objectMapper.readValue(menuArray.toString(), new TypeReference<List<Menu>>() {
			});

		}

		catch (Exception e) {
			e.printStackTrace();
		}

		return menus;
	}

	// Menu From Db For Restaurant APIKey
	@GetMapping("/api/restaurant/db/{apiKey}")
	public List<Menu> getMenuFromDB(@PathVariable("apiKey") String apiKey) {
		Integer restaurantId = dao.getIdByKey(apiKey);
		if (restaurantId == null) {
			List<Menu> menu = new ArrayList<>();
			return menu;
		}
		List<Menu> menus = menuDao.findMenuByRestaurantId(restaurantId);

		for (Menu m : menus) {
			for (Item item : m.getItems()) {
				item.setMenuId(m.getId());
			}
		}
		return menus;

	}

	@GetMapping("/dump/menu")
	public void getMenu() {
		List<Restaurant> restaurants = dao.findAll();
		try {
			DefaultHttpClient httpClient = new DefaultHttpClient();

			for (int i = 0; i < restaurants.size(); i++) {

				String apiKey = restaurants.get(i).getApiKey();
				Restaurant rest = restaurants.get(i);
				HttpGet getRequest = new HttpGet("https://api.eatstreet.com/publicapi/v1/restaurant/" + apiKey
						+ "/menu?access-token=918ad90b88e76305");
				getRequest.addHeader("accept", "application/json");

				HttpResponse response = httpClient.execute(getRequest);

				if (response.getStatusLine().getStatusCode() != 200) {
					throw new RuntimeException("Error : HTTP error code : " + response.getStatusLine().getStatusCode());
				}

				BufferedReader br = new BufferedReader(new InputStreamReader((response.getEntity().getContent())));

				String output;
				JSONArray menus = null;

				while ((output = br.readLine()) != null) {
					try {
						JSONParser parser = new JSONParser();
						menus = (JSONArray) parser.parse(output);
					} catch (Exception e) {
						e.printStackTrace();
					}

				}
				// For menus of restaurant
				for (int j = 0; j < menus.size(); j++) {
					JSONObject menuJson = (JSONObject) menus.get(j);

					ObjectMapper objectMapper = new ObjectMapper();

					Menu menu = objectMapper.readValue(menuJson.toString(), Menu.class);
					menuDao.createMenuForRestaurant(rest, menu);

					JSONArray items = (JSONArray) menuJson.get("items");

					for (int k = 0; k < items.size(); k++) {
						JSONObject jsonI = (JSONObject) items.get(k);
						Item item = objectMapper.readValue(jsonI.toString(), Item.class);
						itemDao.createItemForMenu(menu, item);

					}

				}
			}
			httpClient.getConnectionManager().shutdown();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
