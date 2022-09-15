package com.organizer.stufforganizer.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.organizer.stufforganizer.Repository.wineRepository;
import com.organizer.stufforganizer.Entity.wineEntity;

import java.sql.Date;

@Controller
public class wineTrackerController {

    @Autowired
    private wineRepository wineRepo;

    @GetMapping("/wine")
    public String getWinePage() {return "wineTracker";}

    @PostMapping(path = "/add")
    public @ResponseBody String addNewWine(@RequestParam String wineType, @RequestParam String wineValue, @RequestParam String wineBrand, @RequestParam String location, @RequestParam String datePurchased) {
            wineEntity wine = new wineEntity();
            wine.setWineType(wineType);
            wine.setWineValue(wineValue);
            wine.setWineBrand(wineBrand);
            wine.setLocation(location);
            wine.setDatePurchased(datePurchased);
            wineRepo.save(wine);
            return "Saved";
        }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<wineEntity> getAllWines() {
        // This returns a JSON or XML with the wines
        System.out.println(wineRepo.findAll());
        return wineRepo.findAll();
    }
}
