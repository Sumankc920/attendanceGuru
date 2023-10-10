package com.arun.ag_backend.Services;


import com.arun.ag_backend.Entities.Class;
import com.arun.ag_backend.Entities.ClassRoutine;
import com.arun.ag_backend.Entities.Subject;
import com.arun.ag_backend.Repo.ClassRoutineRepo;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Optional;


@Service
public class ClassRoutineService {

    @Autowired
    private ClassRoutineRepo classRoutineRepo;

    @Autowired
    private ClassService classService;

    @Autowired
    private SubjectService subjectService;


    public  String insertRoutine(JsonNode classRoutineJson){

        int roomNo =  classRoutineJson.get("class_room_no").asInt();
        JsonNode routineArray = classRoutineJson.get("routine");


        Optional<Class> aclassOptional =  classService.getClassDetails((roomNo));

        if (aclassOptional.isEmpty()){
           return ("Class not found");
        }else {

            Class aClass = aclassOptional.get();

            for (JsonNode dayNode : routineArray) {
                String dayOfWeek = dayNode.get("dayOfWeek").asText();
                JsonNode subjectsArray = dayNode.get("subjects");
                System.out.println(dayOfWeek);
                for (JsonNode subjectNode : subjectsArray) {
                    String subjectName = subjectNode.get("subjectName").asText();
                    String startTime = subjectNode.get("startTime").asText();
                    String endTime = subjectNode.get("endTime").asText();

                    Optional<Subject> subjectOptional = subjectService.findSubjectDetails(subjectName);
                    if(subjectOptional.isPresent()){
                        Subject subject = subjectOptional.get();

                        ClassRoutine classRoutine = new ClassRoutine();
                        classRoutine.setAClass(aClass);
                        classRoutine.setSubject(subject);
                        classRoutine.setDayOfWeek(DayOfWeek.valueOf(dayOfWeek));
                        classRoutine.setStartTime(LocalTime.parse(startTime));
                        classRoutine.setEndTime(LocalTime.parse(endTime));

                        classRoutineRepo.save(classRoutine);
                    }else {
                        return "Subject Not found";
                    }

                }
            }

            return "Success";
        }


    }
}
