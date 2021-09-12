package com.AitorRodriguez.SpringCVWeb.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping(value = "/email")
public class EmailController {
	@Autowired
	private IEmailService IEmailService;

	@PostMapping(value = "/send")
	@ResponseBody
	public boolean SendEmail(@RequestBody Email email) {
		return IEmailService.sendEmail(email);

	}
}
