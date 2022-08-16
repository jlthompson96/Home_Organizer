package com.organizer.stufforganizer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class dashboardController {

    @GetMapping("/")
    public String getLoginPage(){
        return "dashboard";
    }
}
