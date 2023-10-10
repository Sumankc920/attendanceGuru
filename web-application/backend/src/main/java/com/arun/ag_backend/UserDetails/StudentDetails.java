package com.arun.ag_backend.UserDetails;

import com.arun.ag_backend.Entities.Student;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@AllArgsConstructor
@NoArgsConstructor
public class StudentDetails implements UserDetails {

    private Student student;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(student.getUser().getRole()));
    }

    @Override
    public String getPassword() {
        return student.getUser().getPassword();
    }

    @Override
    public String getUsername() {
        return student.getUser().getName();
    }


    public String getEmail() {
        return student.getUser().getEmail();
    }
    public int getRoll(){
        return student.getRoll();
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
