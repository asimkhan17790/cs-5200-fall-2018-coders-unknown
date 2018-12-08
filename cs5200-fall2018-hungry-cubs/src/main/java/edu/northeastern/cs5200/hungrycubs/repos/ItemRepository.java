package edu.northeastern.cs5200.hungrycubs.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.hungrycubs.models.Item;

public interface ItemRepository extends CrudRepository<Item, Integer> {

	@Query("SELECT item FROM Item item WHERE menu_id=:menuId")
	public List<Item> getItemsByMenuId(int menuId);
}
