package com.organizer.stufforganizer.Controller;

import com.organizer.stufforganizer.Entity.ServiceResponse;
import com.organizer.stufforganizer.Entity.giftCardEntity;
import com.organizer.stufforganizer.Repository.giftCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class giftCardController {

    @Autowired
    private giftCardRepository giftCardRepo;
    List<giftCardEntity> giftCardList = new ArrayList<>();

    @GetMapping("/giftcards")
    public String getLoginPage() {
        return "giftcardfuelpoints";
    }

    @PostMapping(path = "/addGiftCard")
    public ResponseEntity<Object> addNewGiftCard(@RequestBody giftCardEntity giftCard) {
        giftCardList.add(giftCard);
        ServiceResponse<giftCardEntity> response = new ServiceResponse<giftCardEntity>("success", giftCard);
        giftCard.setVendor(giftCard.getVendor());
        giftCard.setAmount(giftCard.getAmount());
        giftCard.setFuelPointsEarned(giftCard.getFuelPointsEarned());
        giftCard.setDatePurchased(giftCard.getDatePurchased());
        giftCard.setLocation(giftCard.getLocation());
        giftCard.setUsed(giftCard.getUsed());
        giftCardRepo.save(giftCard);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @GetMapping(path="/allCards")
    public @ResponseBody Iterable<giftCardEntity> getAllGiftCards() {
        // This returns a JSON or XML with the gift cards
        return giftCardRepo.findAll();
    }
}
