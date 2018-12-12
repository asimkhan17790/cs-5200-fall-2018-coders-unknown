/*
 * package edu.northeastern.cs5200.hungrycubs;
 * 
 * import org.springframework.context.annotation.Configuration; import
 * org.springframework.web.servlet.config.annotation.CorsRegistry; import
 * org.springframework.web.servlet.config.annotation.EnableWebMvc; import
 * org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
 * 
 *//**
	 * @author Asim
	 * 
	 *         Class used to define webmvc configuration with CORS setup
	 *
	 *//*
		 * //@Configuration //@EnableWebMvc public class SpringRestConfiguration
		 * implements WebMvcConfigurer{ // Logger private static Logger logger =
		 * Logger.getLogger(SpringRestConfiguration.class.getName());
		 * 
		 * @Bean public WebMvcConfigurer corsConfigurer() { return new
		 * WebMvcConfigurerAdapter() {
		 * 
		 * @Override public void addCorsMappings(CorsRegistry registry) {
		 * logger.info("Configure cors"); registry.addMapping("/**")
		 * .allowedOrigins("*") .allowedMethods("GET", "POST", "PUT", "DELETE")
		 * .allowedHeaders("Origin", "X-Requested-With", "Content-Type", "Accept"); } };
		 * }
		 * 
		 * @Override public void addCorsMappings(CorsRegistry registry) {
		 * registry.addMapping("/**"); } }
		 */