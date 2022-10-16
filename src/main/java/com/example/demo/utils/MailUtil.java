package com.example.demo.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;


@Service
public class MailUtil {
    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    private JavaMailSender mailSender;


    /**
     * Email sending by text
     * @param to  recipient
     * @param subject  title
     * @param content  text content
     */
    public void  sendSimpleMail(String to,String subject,String  content){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        message.setFrom(from);
        mailSender.send(message);
    }

    /**
     * Email sending by HTML
     * @param to  recipient
     * @param subject  title
     * @param content  HTML content
     */
    public void sendHtmlMail(String to,String subject,String content) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setTo(to);
        helper.setSubject(subject);
        /* setText(true means HTML content);   */
        helper.setText(content,true);
        helper.setFrom(from);
        mailSender.send(message);

    }
}
