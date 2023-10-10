package com.arun.ag_backend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsDTO {
    private String name;

    private String email;

    private String password;

    private String role;
   private int college_roll;
   private String authority;


}
