package edu.northeastern.cs5200.hungrycubs.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.Item;
import edu.northeastern.cs5200.hungrycubs.models.Menu;
import edu.northeastern.cs5200.hungrycubs.repos.ItemRepository;
import edu.northeastern.cs5200.hungrycubs.repos.MenuRepository;

import java.util.*;

@Component
public class ItemDao {
	
	@Autowired
	private MenuRepository menuRep;
	@Autowired
	private ItemRepository itemRep;
	
	public Item createItemForMenu(Menu menu, Item item)
	{
		menu.addItem(item);
		item.setMenu(menu);
		Item newI = itemRep.save(item);
		menuRep.save(menu);
		return newI;
		
	}
}
