package com.organizer.stufforganizer.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class homeController {

    @GetMapping("/")
    public String getHomePage() {
        return "index";
    }
}
