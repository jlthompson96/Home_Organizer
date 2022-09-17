package com.organizer.stufforganizer.Controller;

import com.organizer.stufforganizer.Entity.ServiceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.organizer.stufforganizer.Repository.wineRepository;
import com.organizer.stufforganizer.Entity.wineEntity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Controller
public class wineTrackerController {

List<wineEntity> wineList = new ArrayList<>();
    @Autowired
    private wineRepository wineRepo;

    @GetMapping("/wine")
    public String getWinePage() {return "wineTracker";}

    @PostMapping(path = "/add")
    public ResponseEntity<Object> addNewWine(@RequestBody wineEntity wine) {
        wineList.add(wine);
        ServiceResponse<wineEntity> response = new ServiceResponse<wineEntity>("success", wine);
        wine.setWineType(wine.getWineType());
        wine.setWineValue(wine.getWineValue());
        wine.setWineBrand(wine.getWineBrand());
        wine.setLocation(wine.getLocation());
        wine.setDatePurchased(wine.getDatePurchased());
        wineRepo.save(wine);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
        }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<wineEntity> getAllWines() {
        // This returns a JSON or XML with the wines
        return wineRepo.findAll();
    }
}
