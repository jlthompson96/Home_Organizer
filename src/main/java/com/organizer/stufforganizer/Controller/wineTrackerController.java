package com.organizer.stufforganizer.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class wineTrackerController {

    @GetMapping("/wine")
    public String getWineTracker(){
        return "wineTracker";
    }
}