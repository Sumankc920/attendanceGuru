package com.arun.ag_backend.Services;

import com.arun.ag_backend.Entities.Attendance;
import com.arun.ag_backend.Entities.ClassRoutine;
import com.arun.ag_backend.Entities.Student;
import com.arun.ag_backend.Repo.AttendanceRepo;
import com.arun.ag_backend.Repo.ClassRoutineRepo;
import com.arun.ag_backend.Repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class AttendanceService {

    @Autowired
    private ClassRoutineRepo classRoutineRepository;

    @Autowired
    private StudentRepo studentRepository;

    @Autowired
    private AttendanceRepo attendanceRepository;


    public void markAttendance(int rollNo, int roomNo, DayOfWeek day, LocalTime time) {


        // Step 1: Retrieve the class routine for the given day, time, and room number
        ClassRoutine classRoutine = classRoutineRepository.findByDayAndTimeAndRoom(day, time, roomNo);

        if (classRoutine != null) {
            // Step 2: Find the student based on the roll number
            Student student = studentRepository.findByRoll(rollNo);
            boolean attendanceExists = attendanceRepository.existsSameAttendance(student , classRoutine , LocalDate.now());

            if (!attendanceExists){
                if (student != null) {
                    // Step 3: Create or update the attendance record
                    Attendance attendance = new Attendance();
                    attendance.setStudent(student);
                    attendance.setClassRoutine(classRoutine);
                    attendance.setDate(LocalDate.now()); // You can set the current date
//                    attendance.setDay(classRoutine.getDayOfWeek());
                    attendance.setStatus("Present"); // You can set "Present" or "Absent" based on your logic
//                    System.out.println("Attendance saved");
                    attendanceRepository.save(attendance);

                }else {
                System.out.println("Student not found with roll number: " + rollNo);
                }
            }else {
                System.out.println("Student attendance already exists");
            }
        } else {
            System.out.println("Class routine not found for the given day, time, and room number.");
        }
    }
}
