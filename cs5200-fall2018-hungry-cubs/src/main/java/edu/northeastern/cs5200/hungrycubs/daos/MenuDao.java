package edu.northeastern.cs5200.hungrycubs.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.Item;
import edu.northeastern.cs5200.hungrycubs.models.Menu;
import edu.northeastern.cs5200.hungrycubs.models.Restaurant;
import edu.northeastern.cs5200.hungrycubs.repos.ItemRepository;
import edu.northeastern.cs5200.hungrycubs.repos.MenuRepository;
import edu.northeastern.cs5200.hungrycubs.repos.RestaurantRepository;

@Component
public class MenuDao {

	@Autowired
	private MenuRepository menuRep;
	
	@Autowired
	private ItemRepository itemRep;
	
	@Autowired
	private RestaurantRepository restRep;
	
	public Menu createMenuForRestaurant(Restaurant rest, Menu menu)
	{
		rest.addMenu(menu);
		menu.setRestaurant(rest);
		Menu newM = menuRep.save(menu);
		restRep.save(rest);
		return newM;
		
	}
	
	public void attachItemToMenu(Menu menu, Item item)
	{
		menu.addItem(item);
		item.setMenu(menu);
		itemRep.save(item);
		menuRep.save(menu);
	}
	
}
