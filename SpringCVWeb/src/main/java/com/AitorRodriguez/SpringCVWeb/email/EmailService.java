package com.AitorRodriguez.SpringCVWeb.email;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.AitorRodriguez.SpringCVWeb.DAO.InformationRepository;
import com.AitorRodriguez.SpringCVWeb.entity.Information;

@Service
public class EmailService implements IEmailService {

	private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

	@Autowired
	private JavaMailSender sender;

	@Autowired
	private InformationRepository exceptionsRepository;

	@Value("${mailRecipient}")
	private String mailRecipient;

	@Override
	public boolean sendEmail(Email email) {
		return sendEmailTool(email.getContent(), email.getEmail(), email.getSubject());
	}

	private boolean sendEmailTool(String textMessage, String email, String subject) {
		boolean sent = false;
		try {
			MimeMessage message = createAndDefineEmail(textMessage, email, subject);
			sender.send(message);
			sent = true;
			this.defineAndSaveLogInformation(null);
		} catch (Exception e) {
			this.defineAndSaveLogInformation(e);
		}
		return sent;
	}

	private void defineAndSaveLogInformation(Exception e) {
		Information informationPiece = new Information();
		informationPiece.setTimestamp(java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss")));
		if (e==null) {
			informationPiece.setType("Information");
			informationPiece.setMessage("Mensaje enviado con éxito");
		} else {
			informationPiece.setType("Exception");
			informationPiece.setStacktrace(convertStackTraceToString(e));
			informationPiece.setMessage(e.getMessage());
		}
		exceptionsRepository.save(informationPiece);
	}

	private String convertStackTraceToString(Exception e) {
		StringWriter sw = new StringWriter();
		e.printStackTrace(new PrintWriter(sw));
		return sw.toString();
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
