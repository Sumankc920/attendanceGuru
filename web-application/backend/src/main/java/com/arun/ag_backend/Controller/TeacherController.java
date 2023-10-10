package com.arun.ag_backend.Controller;

import com.arun.ag_backend.Entities.Class;
import com.arun.ag_backend.Entities.Subject;
import com.arun.ag_backend.Services.TeacherService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;


    @RequestMapping("/classes")
    public String get_teaching_details(Principal principal){
        List<Class> teachingDetailsList = teacherService.get_teacher_classes(principal.getName());

        try {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(teachingDetailsList);
            return json;
        } catch (Exception e) {
            // Handle any potential exceptions
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("/classes/subject/{class_id}")
    public String get_subject(@PathVariable("class_id") int classId, Principal principal){
        System.out.println(principal.getName() + " " + classId);
        Subject subject = teacherService.get_teacher_subject(principal.getName() , classId);
//        System.out.println(principal.getName() + " " + classId);
        try {
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(subject);

            return json;
        } catch (Exception e) {
            // Handle any potential exceptions
            e.printStackTrace();
            return null;
        }
    }
}
