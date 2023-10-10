package com.arun.ag_backend.Repo;

import com.arun.ag_backend.Entities.OTP;
import com.arun.ag_backend.Entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepo extends JpaRepository<OTP, Integer> {
    @Modifying
    @Query("DELETE FROM OTP o WHERE o.users = :user")
    void deleteByUser(@Param("user") Users user);

    @Query("SELECT o from OTP o where o.otp_token = :otp_token")
    Optional<OTP> findByOtp(@Param("otp_token") int otp_token);

    Optional<OTP> findByUsers(Users user);
}
