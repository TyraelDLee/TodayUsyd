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
     * 文本邮件的发送
     * @param to  接收邮件者
     * @param subject  主题
     * @param content   内容
     */
    public void  sendSimpleMail(String to,String subject,String  content){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);
        message.setFrom(from);

        // 发送
        mailSender.send(message);
    }

    /**
     * HTML 文本邮件
     * @param to  接收邮件者
     * @param subject  主题
     * @param content   HTML内容
     */
    public void sendHtmlMail(String to,String subject,String content) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setTo(to);
        helper.setSubject(subject);
        /* setText(内容,true:是HTML内容);   */
        helper.setText(content,true);

        helper.setFrom(from);
        mailSender.send(message);

    }









}
