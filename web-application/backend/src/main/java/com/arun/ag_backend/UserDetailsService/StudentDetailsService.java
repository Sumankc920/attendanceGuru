package com.arun.ag_backend.UserDetailsService;

import com.arun.ag_backend.Entities.Student;
import com.arun.ag_backend.Repo.StudentRepo;
import com.arun.ag_backend.UserDetails.StudentDetails;
import com.arun.ag_backend.UserDetails.TeacherDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class StudentDetailsService implements UserDetailsService {

    @Autowired
    private StudentRepo studentRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Student student = studentRepo.findByUserEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        return new StudentDetails(student);

    }
}
