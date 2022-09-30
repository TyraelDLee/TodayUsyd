package com.example.demo.utils.interceptor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import java.util.concurrent.TimeUnit;

@Configuration
public class ConfigAdaptor extends WebMvcConfigurationSupport {

    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        // 配置拦截器的需要 拦截的地址
        // 拦截所有 : /**
        registry.addInterceptor(getAuthInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("favicon.ico");
        super.addInterceptors(registry);
    }

    // 自己创建的拦截器
    @Bean
    public AuthInterceptor getAuthInterceptor(){
        return new AuthInterceptor();
    }

    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.HOURS).cachePublic());
        super.addResourceHandlers(registry);
    }
}
