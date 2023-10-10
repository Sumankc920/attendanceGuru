package com.arun.ag_backend.Dto;

import com.arun.ag_backend.Entities.Student;
import com.arun.ag_backend.Entities.Teacher;
import com.arun.ag_backend.Entities.Users;
import org.springframework.stereotype.Component;

@Component
public class Helper {

    public static Users dto_to_entity(UserDTO userDTO) {
        Users user = new Users();
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        user.setPassword(userDTO.getPassword());

        return user;
    }


}
