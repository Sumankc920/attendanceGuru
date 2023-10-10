package com.arun.ag_backend.Dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class TeacherDTO {

    private String name;

    private String email;

    private String password;

    private String role;

}
