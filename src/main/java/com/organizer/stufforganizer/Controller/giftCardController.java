package com.organizer.stufforganizer.Controller;

import com.organizer.stufforganizer.Entity.giftCardEntity;
import com.organizer.stufforganizer.Service.giftCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class giftCardController {

    @Autowired
    private giftCardService giftCardService;

    @GetMapping("/giftCard")
    public String getLoginPage() {
        return "giftCardFuelPoints";
    }

    @GetMapping("/giftCardList")
    public ResponseEntity<List<giftCardEntity>> getGiftCardList() {
        return new ResponseEntity<List<giftCardEntity>>(giftCardService.getGiftCardList(), HttpStatus.OK);
    }

    @GetMapping("/giftCard/{id}")
    public ResponseEntity<giftCardEntity> getGiftCardById(@PathVariable int id){
        return new ResponseEntity<giftCardEntity>(giftCardService.getGiftCardById(id), HttpStatus.OK);
    }

    @PostMapping("/giftCard/save")
    public ResponseEntity<Void> saveOrUpdateGiftCard(@RequestBody giftCardEntity giftCard){
        giftCardService.saveOrUpdateGiftCard(giftCard);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/giftCard/delete/{id}")
    public ResponseEntity<Void> deleteGiftCard(@PathVariable int id){
        giftCardService.delete(id);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
