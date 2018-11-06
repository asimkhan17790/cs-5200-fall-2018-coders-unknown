package edu.northeastern.cs5200.hungrycubs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class Cs5200Fall2018HungryCubsApplication extends SpringBootServletInitializer{

	/* (non-Javadoc)
	 * @see org.springframework.boot.web.servlet.support.SpringBootServletInitializer#configure(org.springframework.boot.builder.SpringApplicationBuilder)
	 * 
	 * Enable remote REST APIs on AWS by extending SpringBootServletInitializer in your SpringBootApplication
	 */
	@Override
	protected SpringApplicationBuilder
		configure(SpringApplicationBuilder application) {
		return application.sources(
				Cs5200Fall2018HungryCubsApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(Cs5200Fall2018HungryCubsApplication.class, args);
	}
}
