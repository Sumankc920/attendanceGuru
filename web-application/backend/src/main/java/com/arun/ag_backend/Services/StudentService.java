package com.arun.ag_backend.Services;

import com.arun.ag_backend.Dto.StudentDto;
import com.arun.ag_backend.Entities.Class;
import com.arun.ag_backend.Entities.OTP;
import com.arun.ag_backend.Entities.Student;

import com.arun.ag_backend.Entities.Subject;
import com.arun.ag_backend.Entities.Users;
import com.arun.ag_backend.Repo.OtpRepo;
import com.arun.ag_backend.Repo.StudentRepo;
import com.arun.ag_backend.Repo.UserRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.json.JsonArray;
import java.util.*;

@Service
public class StudentService {

    @Autowired
    private BCryptPasswordEncoder encoder;
    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private OtpRepo otpRepo;

    public void save_student(Users user , int roll , Class aClass) {


        Student student = new Student();
        student.setRoll(roll);
        student.setUser(user);
        student.setAClass(aClass);

        studentRepo.save(student);

    }

    public String get_classes(String email) throws Exception {

        Class class1  = new Class();
        List<Map<String, Object>> jsonList = new ArrayList<>();
        List<Object[]> classAndSubjects = studentRepo.findClassAndSubjectsByEmail(email);
        for (Object[] result : classAndSubjects) {
            Class classes = (Class) result[0];
            class1 = classes;
            Subject subject = (Subject) result[1];

            Map<String, Object> jsonObject = new HashMap<>();


            // Access the class and subject properties as needed
            String subjectName = subject.getShort_name();

            jsonObject.put("subject", subject.getShort_name());




            jsonList.add(jsonObject);

        }
        Map<String, Object> classDetails = new HashMap<>();
        classDetails.put("faculty", class1.getFaculty());
        classDetails.put("semester", class1.getSemester());
        classDetails.put("shift", class1.getShift());
        jsonList.add(classDetails);


        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(jsonList);

        return json;
    }
}
