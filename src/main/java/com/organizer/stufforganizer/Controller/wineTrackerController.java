package com.organizer.stufforganizer.Controller;

import com.organizer.stufforganizer.Service.wineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import com.organizer.stufforganizer.Entity.wineEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class wineTrackerController {

    @Autowired
    private wineService wineService;

    @GetMapping("/wine")
    public String getWinePage() {
        return "wineTracker";
    }
    @GetMapping("/wineList")
    public ResponseEntity<List<wineEntity>> getWineList() {
        return new ResponseEntity<List<wineEntity>>(wineService.getWineList(), HttpStatus.OK);
    }

    @GetMapping("/wine/{id}")
    public ResponseEntity<wineEntity> getWineById(@PathVariable int id) {
        return new ResponseEntity<wineEntity>(wineService.getWineById(id), HttpStatus.OK);
    }

    @PostMapping("/wine/save")
    public ResponseEntity<Void> saveOrUpdateWine(@RequestBody wineEntity wine) {
        wineService.saveOrUpdate(wine);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/wine/delete/{id}")
        public ResponseEntity<Void> deleteWine(@PathVariable int id) {
            wineService.delete(id);
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
}
