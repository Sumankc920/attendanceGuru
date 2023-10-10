package com.arun.ag_backend.Services;

import com.arun.ag_backend.Entities.Admin_assigned_Users;
import com.arun.ag_backend.Entities.Class;
import com.arun.ag_backend.Repo.Admin_a_Repo;
import com.arun.ag_backend.Repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Admin_a_User_Service {

    @Autowired
    private Admin_a_Repo repo;

    @Autowired
    private StudentRepo studentRepo;

    public Optional<Admin_assigned_Users> findByEmail(String email){

        return repo.findByEmail(email);
    }

    public List<String> get_subject_from_sem_shift(int semester , String shift){
        List<String> subjects =   repo.findNamesForSemesterAndShift(semester , shift);


        return subjects;
    }

    public List<Object> get_student_info(int semester , String shift){
        return studentRepo.findStudentBySemAndShift(semester ,shift);
    }
    public List<Object> get_sub_all_details(String sub_name , int semester , String shift){

        return studentRepo.findStudentBySemAndShiftAndSubject(sub_name, semester, shift);
    }

}
