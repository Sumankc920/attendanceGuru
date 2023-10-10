package com.arun.ag_backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserController {

    @RequestMapping
    public ResponseEntity<Object> getClasses(Principal principal){


        return ResponseEntity.ok("");
    }
}
