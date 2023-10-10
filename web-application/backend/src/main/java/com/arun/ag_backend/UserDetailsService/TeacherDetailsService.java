package com.arun.ag_backend.UserDetailsService;

import com.arun.ag_backend.Entities.Teacher;
import com.arun.ag_backend.Repo.TeacherRepo;
import com.arun.ag_backend.UserDetails.TeacherDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class TeacherDetailsService implements UserDetailsService {

    @Autowired
    private TeacherRepo teacherRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Teacher teacher = teacherRepo.findByUserEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        return new TeacherDetails(teacher);

    }
}
