package edu.northeastern.cs5200.hungrycubs.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.DeliveryBoy;
import edu.northeastern.cs5200.hungrycubs.repos.DeliveryBoyRepository;

@Component
public class DeliveryBoyDao {
	
	@Autowired
	private DeliveryBoyRepository dbRep;
	
	
	public DeliveryBoy createDeliveryBoy(DeliveryBoy db)
	{
		return dbRep.save(db);
	}
	
	public Boolean isAvailable()
	{
		return dbRep.getAvailableCount() != 0;
	}
	
	public List<DeliveryBoy> getDeliveryBoy()
	{
		return dbRep.getDeliveryBoy();
	}
	
	public DeliveryBoy findById(int id)
	{
		return dbRep.findById(id).get();
	}
	
	public List<DeliveryBoy> findAll()
	{
		return (List<DeliveryBoy>) dbRep.findAll();
	}
	
	public void deleteById(int id)
	{
		dbRep.deleteById(id);
	}

}
