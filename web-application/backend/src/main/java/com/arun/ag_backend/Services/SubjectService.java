package com.arun.ag_backend.Services;

import com.arun.ag_backend.Entities.Subject;
import com.arun.ag_backend.Repo.SubjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepo subjectRepo;
    public Optional<Subject> findSubjectDetails(String short_name){
        return subjectRepo.findByShort_name(short_name);
    }
}
