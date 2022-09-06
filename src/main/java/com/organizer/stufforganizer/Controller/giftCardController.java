package com.organizer.stufforganizer.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class giftCardController {

    @GetMapping("/")
    public String getLoginPage(){
        return "dashboard";
    }
}
