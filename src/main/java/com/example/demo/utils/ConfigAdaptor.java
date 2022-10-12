//package com.example.demo.utils;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.CacheControl;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
//
//import java.util.concurrent.TimeUnit;
//
//@Configuration
//public class ConfigAdaptor extends WebMvcConfigurationSupport {
//
//    @Override
//    protected void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(getAuthInterceptor())
//                .addPathPatterns("/**")
//                .excludePathPatterns("/static/favicon.ico").excludePathPatterns("/static/register.html").excludePathPatterns("/static.login.html")
//                .excludePathPatterns("/static/**", "/public/**", "/resources/**", "/plugin/**", "/images/**");
//        super.addInterceptors(registry);
//    }
//
//    @Bean
//    public AuthInterceptor getAuthInterceptor(){
//        return new AuthInterceptor();
//    }
//
//    @Override
//    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/static/**")
//                .addResourceLocations("classpath:/META-INF/resources")
//                .addResourceLocations("classpath:/resources/")
//                .addResourceLocations("classpath:/static/")
//                .addResourceLocations("classpath:/static/static")
//                .addResourceLocations("classpath:/public/")
//                .setCacheControl(CacheControl.maxAge(1, TimeUnit.HOURS).cachePublic());
//        super.addResourceHandlers(registry);
//    }
//}
//
