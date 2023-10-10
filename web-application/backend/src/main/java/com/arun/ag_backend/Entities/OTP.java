package com.arun.ag_backend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Random;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OTP {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "otp_id")
    private int id ;

    private int otp_token;

    @Column(name = "Created_time")
    private LocalDateTime localDateTime;

    @OneToOne(targetEntity = Users.class , fetch = FetchType.EAGER)
    @JoinColumn(nullable = false , name = "user_id")
    private Users users;


    public OTP(Users users) {
        this.users = users;
        this.localDateTime = LocalDateTime.now();
        Random random = new Random();
        this.otp_token = random.nextInt(900000) + 100000;
    }
}
