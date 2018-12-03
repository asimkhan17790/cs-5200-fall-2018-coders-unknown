package edu.northeastern.cs5200.hungrycubs.controllers.hello;

import java.util.*;

import edu.northeastern.cs5200.hungrycubs.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
public class HelloController {
	
	@Autowired
	HelloRepository helloRepository;

	
	@RequestMapping("/api/hello/string")
	public String sayHello() {
		return "Hello Mohd Asim Khan!";
	}
	
	@RequestMapping("/api/hello/object")
	public HelloObject sayHelloObject() {
		HelloObject obj = new HelloObject("Hello Mohd Asim Khan!");
		return obj;
	}
	
	@RequestMapping("/api/hello/insert")
	public HelloObject insertHelloObject() {
		HelloObject obj = new HelloObject("Hello Mohd Asim Khan!");
		helloRepository.save(obj);
		return obj;
	}
	
	@RequestMapping("/api/hello/insert/{msg}")
	public HelloObject insertMessage(@PathVariable("msg") String message) {
		HelloObject obj = new HelloObject(message);
		helloRepository.save(obj);
		return obj;
	}
	
	@RequestMapping("/api/hello/select/all")
	public List<HelloObject> selectAllHelloObjects() {
		List<HelloObject> hellos =
			(List<HelloObject>)helloRepository.findAll();
		return hellos;
	}
}
