package com.arun.ag_backend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto {

    private String  name;
    String email;
    String password;
    int college_roll;
    private String role;
}
