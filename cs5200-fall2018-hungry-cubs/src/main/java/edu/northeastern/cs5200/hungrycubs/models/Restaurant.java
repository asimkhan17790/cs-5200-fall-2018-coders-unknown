package edu.northeastern.cs5200.hungrycubs.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
import java.util.ArrayList;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Restaurant {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String apiKey;
	private String name;
	private Boolean open;
	private String timezone;
	private Boolean acceptsCash;
	private Double latitude;
	private Double longitude;
	private Boolean offersPickup;
	private Boolean acceptsCard;
	private int maxWaitTime;
	private Boolean offersDelivery;
	private Double deliveryPrice;
	private Double taxRate;
	private int minWaitTime;
	private String logoUrl;
	private String url;

	private Double minFreeDelivery;
	private Double deliveryMin;
	
	@Transient
	private String city;
	@Transient
	private String state;
	@Transient
	private String zip;
	@Transient
	private String phone;
	@Transient
	private String streetAddress;
	
	
	@OneToMany(mappedBy="restaurant", orphanRemoval=true)
	private List<Address> addresses;
	@OneToMany(mappedBy="restaurant", orphanRemoval=true)
	private List<Phone> phones;
	@OneToMany(mappedBy="restaurant", orphanRemoval=true)
	private List<Menu> menus;
	
	@OneToOne(mappedBy="restaurant")	
	private Manager manager;
	
	@OneToMany(mappedBy="restaurant", orphanRemoval=true)
	private List<Assignment> assignments;
	@OneToMany(mappedBy="restaurant", orphanRemoval=true)
	private List<Order> orders;
	
	public Restaurant()
	{
		
	}
	
	public Restaurant(int id)
	{
		this.id = id;
	}
	
	public Restaurant(String apiKey, String name, Boolean open) {
		super();
		this.apiKey = apiKey;
		this.name = name;
		this.open = open;
	}
	
	public String getApiKey() {
		return apiKey;
	}
	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Boolean getOpen() {
		return open;
	}
	public void setOpen(Boolean open) {
		this.open = open;
	}
	public List<Address> getAddresses() {
		return addresses;
	}
	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}
	public List<Phone> getPhones() {
		return phones;
	}
	public void setPhones(List<Phone> phones) {
		this.phones = phones;
	}
	
	public void addPhone(Phone phone)
	{
		if(phones == null)
			phones = new ArrayList<>();
		phones.add(phone);
	}
	
	public void addAddress(Address address)
	{
		if(addresses == null)
			addresses = new ArrayList<>();
		addresses.add(address);
	}
	
	public void deletePhone(Phone phone)
	{
		phones.remove(phone);
	}
	
	public void deleteAddress(Address address)
	{
		addresses.remove(address);
	}
	
	public void addMenu(Menu menu)
	{
		if(menus == null)
			menus = new ArrayList<>();
		menus.add(menu);
	}
	
	public void deleteMenu(Menu menu)
	{
		menus.remove(menu);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTimezone() {
		return timezone;
	}

	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}

	public Boolean getAcceptsCash() {
		return acceptsCash;
	}

	public void setAcceptsCash(Boolean acceptsCash) {
		this.acceptsCash = acceptsCash;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Boolean getOffersPickup() {
		return offersPickup;
	}

	public void setOffersPickup(Boolean offersPickup) {
		this.offersPickup = offersPickup;
	}

	public Boolean getAcceptsCard() {
		return acceptsCard;
	}

	public void setAcceptsCard(Boolean acceptsCard) {
		this.acceptsCard = acceptsCard;
	}

	public int getMaxWaitTime() {
		return maxWaitTime;
	}

	public void setMaxWaitTime(int maxWaitTime) {
		this.maxWaitTime = maxWaitTime;
	}

	public Boolean getOffersDelivery() {
		return offersDelivery;
	}

	public void setOffersDelivery(Boolean offersDelivery) {
		this.offersDelivery = offersDelivery;
	}

	public Double getDeliveryPrice() {
		return deliveryPrice;
	}

	public void setDeliveryPrice(Double deliveryPrice) {
		this.deliveryPrice = deliveryPrice;
	}

	public Double getTaxRate() {
		return taxRate;
	}

	public void setTaxRate(Double taxRate) {
		this.taxRate = taxRate;
	}

	public int getMinWaitTime() {
		return minWaitTime;
	}

	public void setMinWaitTime(int minWaitTime) {
		this.minWaitTime = minWaitTime;
	}

	public Double getMinFreeDelivery() {
		return minFreeDelivery;
	}

	public void setMinFreeDelivery(Double minFreeDelivery) {
		this.minFreeDelivery = minFreeDelivery;
	}

	public Double getDeliveryMin() {
		return deliveryMin;
	}

	public void setDeliveryMin(Double deliveryMin) {
		this.deliveryMin = deliveryMin;
	}

	public List<Menu> getMenus() {
		return menus;
	}

	public void setMenus(List<Menu> menus) {
		this.menus = menus;
	}

	public Manager getManager() {
		return manager;
	}

	public void setManager(Manager manager) {
		this.manager = manager;
	}

	public List<Assignment> getAssignments() {
		return assignments;
	}

	public void setAssignments(List<Assignment> assignments) {
		this.assignments = assignments;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}
	
	
	public void addOrder(Order order)
	{
		if(orders == null)
			orders = new ArrayList<>();
		orders.add(order);
	}

}
