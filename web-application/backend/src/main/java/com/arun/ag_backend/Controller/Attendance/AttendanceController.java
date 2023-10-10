package com.arun.ag_backend.Controller.Attendance;

import com.arun.ag_backend.Dto.AttendanceInfoDTO;
import com.arun.ag_backend.Services.AttendanceService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {


    @Autowired
    private AttendanceService attendanceService;

    @RequestMapping("/getAttendance")
    public void getAttendance(JsonNode attendanceList){
        


    }

    @RequestMapping("/set_attendance")
    public void setAttendance(@RequestBody AttendanceInfoDTO attendanceInfoDTO){
            attendanceService.markAttendance(attendanceInfoDTO.getRollNo() , attendanceInfoDTO.getRoomNo() , attendanceInfoDTO.getDay() , attendanceInfoDTO.getTime());

    }
}
