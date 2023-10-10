package com.arun.ag_backend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectInfo {

    private int semester;
    private  String shift;
    private  String sub_name;
}
