package com.example.demo;

import com.example.demo.entity.Favorite;
import com.example.demo.service.FavService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = DemoApplication.class)
public class FavTests {
    @Autowired
    private FavService favService;

    private Favorite favorite = new Favorite("4028818d83dc4e100183dc4ec7340000", "14", "testzhetao");

    @Test
    public void TestAddFav() {
        System.out.println(favService.storeFav(favorite).toString());
    }

    @Test
    public void getFav() {
        System.out.println(favService.getFavByUserid(favorite.getUserid()).toString());
    }

    @Test
    public void removeFav() {
        System.out.println("True or False");
        System.out.println(favService.removeFav(favorite.getUserid()));
    }
}
