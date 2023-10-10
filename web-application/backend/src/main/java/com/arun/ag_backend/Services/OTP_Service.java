package com.arun.ag_backend.Services;

import com.arun.ag_backend.Entities.OTP;
import com.arun.ag_backend.Entities.Users;
import com.arun.ag_backend.Repo.OtpRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OTP_Service {

    @Autowired
    private OtpRepo otpRepo;
    public void save_otp(OTP otp){
        otpRepo.save(otp);
    }

    @Transactional
    public void delete_otp(Users user){
        otpRepo.deleteByUser(user);
    }

    public Optional<OTP> find_otp(String otp_token)
    {
        Optional<OTP> otp = otpRepo.findByOtp(Integer.parseInt(otp_token));

        return otp;

    }
    public Optional<OTP> find_otp(Users user)
    {
        Optional<OTP> otp = otpRepo.findByUsers(user);

        return otp;

    }

}
