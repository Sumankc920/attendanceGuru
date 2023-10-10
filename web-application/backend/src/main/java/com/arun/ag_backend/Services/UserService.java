package com.arun.ag_backend.Services;

import com.arun.ag_backend.Entities.Users;
import com.arun.ag_backend.Repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private OTP_Service otpService;
    public void save_user(Users user){
        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);
//        return user;
    }

    public Optional<Users> finByEmail(String email){
        Optional<Users> user = userRepo.findByEmail(email);
        return user;
    }

    public void delete_user(Users user){
        otpService.delete_otp(user);
        userRepo.delete(user);

    }
    @Transactional
    public  void update_value(boolean newValue , String email){
        userRepo.updateIsEnabledByEmail(newValue , email);
    }

}
