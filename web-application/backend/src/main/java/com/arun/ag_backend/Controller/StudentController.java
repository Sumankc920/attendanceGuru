package com.arun.ag_backend.Controller;
import com.arun.ag_backend.Services.StudentService;
import com.arun.ag_backend.UserDetails.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/student")
public class StudentController {

//    Principal principal;
//    private String email =principal.getName();

    @Autowired
    private StudentService studentService;





    @RequestMapping("/classes")
    public ResponseEntity<Object> getClasses(Principal principal)  throws Exception{

        return ResponseEntity.ok(studentService.get_classes(principal.getName()));
    }

}
