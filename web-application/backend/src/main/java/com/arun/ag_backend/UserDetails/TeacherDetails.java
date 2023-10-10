package com.arun.ag_backend.UserDetails;

import com.arun.ag_backend.Entities.Teacher;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@AllArgsConstructor
@NoArgsConstructor
public class TeacherDetails implements UserDetails {



    private Teacher teacher;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(teacher.getUser().getRole()));
    }

    @Override
    public String getPassword() {
        return teacher.getUser().getPassword();
    }

    @Override
    public String getUsername() {
        return teacher.getUser().getName();
    }

    public String getEmail(){
        return teacher.getUser().getEmail();
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
