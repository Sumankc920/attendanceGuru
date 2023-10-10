package com.arun.ag_backend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttendanceInfoDTO {

    int rollNo;
    int roomNo ;
    private DayOfWeek day;
    LocalTime time ;
}
