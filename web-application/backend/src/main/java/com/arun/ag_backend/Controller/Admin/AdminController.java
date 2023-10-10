package com.arun.ag_backend.Controller.Admin;

import com.arun.ag_backend.Dto.SubjectInfo;
import com.arun.ag_backend.Entities.Student;
import com.arun.ag_backend.Entities.Subject;
import com.arun.ag_backend.Entities.Teacher;
import com.arun.ag_backend.Entities.Users;
import com.arun.ag_backend.Repo.StudentRepo;
import com.arun.ag_backend.Repo.SubjectRepo;
import com.arun.ag_backend.Repo.TeacherRepo;
import com.arun.ag_backend.Services.Admin_a_User_Service;
import com.arun.ag_backend.Services.ClassRoutineService;
import com.arun.ag_backend.Services.SubjectService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/admin")
public class AdminController {


    @Autowired
    private ClassRoutineService classRoutineService;

    @Autowired
    private Admin_a_User_Service admin_service;

    @Autowired
    private TeacherRepo teacherRepo;


    @Autowired
    private SubjectRepo subjectRepo;


    @PostMapping("/add/classRoutine")
    public ResponseEntity<Object> addClassRoutine(@RequestBody JsonNode classRoutineJson){


        classRoutineService.insertRoutine(classRoutineJson);
        return ResponseEntity.ok("Ok");
    }

    @PostMapping("/subjects/details")
    public List<String> find_sub_name(@RequestBody SubjectInfo subjectInfo){

            return  admin_service.get_subject_from_sem_shift(subjectInfo.getSemester() , subjectInfo.getShift());
    }

    @GetMapping("/all_teachers")
    public List<Object> findallTeacher(){

        return  teacherRepo.findAllTeachers();
    }

    @PostMapping("/get_students")
    public List<Object> findallStudents(@RequestBody SubjectInfo s ){
        return admin_service.get_student_info(s.getSemester() , s.getShift());
    }

    @PostMapping("/get_sub_details")
    public List<Object> findSubjectALLDetails(@RequestBody SubjectInfo s ){
        Optional<Subject> sub = subjectRepo.findByShort_name(s.getSub_name());


        Object obj = teacherRepo.findTeacherBySemAndShiftAndSubject(s.getSub_name() , s.getSemester() , s.getShift());
        System.out.printf(obj.toString());
        List<Object> objs =  admin_service.get_sub_all_details(s.getSub_name() , s.getSemester() , s.getShift());

        objs.add(obj);
        objs.add(sub);

        return  objs;
    }

}
