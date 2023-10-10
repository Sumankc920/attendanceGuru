package com.arun.ag_backend.Services;

import com.arun.ag_backend.Entities.Class;
import com.arun.ag_backend.Repo.ClassRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClassService {

    @Autowired
   private ClassRepo classRepo;

    public Optional<Class> getClassDetails(int room_no){
        return classRepo.findByRoom_no(room_no);

    }


}
