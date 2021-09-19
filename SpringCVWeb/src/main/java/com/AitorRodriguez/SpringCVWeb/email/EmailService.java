package com.AitorRodriguez.SpringCVWeb.email;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements IEmailService {

	private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

	@Autowired
	private JavaMailSender sender;
	@Value("${mailRecipient}")
	private String mailRecipient;
	

	@Override
	public boolean sendEmail(Email email) {
		LOGGER.info("EmailBody: {}", email.toString());
		return sendEmailTool(email.getContent(), email.getEmail(), email.getSubject());
	}

	private boolean sendEmailTool(String textMessage, String email, String subject) {
		boolean sent = false;
		try {
			MimeMessage message = createAndDefineEmail(textMessage, email, subject);
			sender.send(message);
			sent = true;
			LOGGER.info("Mail enviado!");
		} catch (MessagingException e) {
			LOGGER.error("Hubo un error al enviar el mail: {}", e);
		}
		return sent;
	}

	private MimeMessage createAndDefineEmail(String textMessage, String email, String subject)
			throws MessagingException {
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		helper.setTo(mailRecipient);
		helper.setText("Mensaje enviado desde <b>" + email + "</b><br>" + textMessage, true);
		helper.setSubject(subject);
		return message;
	}
}
