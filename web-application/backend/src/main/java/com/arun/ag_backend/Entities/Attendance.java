package com.arun.ag_backend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Entity
@Table(name = "Attendance")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int attendance_id;

    @ManyToOne
    @JoinColumn(name = "roll_no")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "class_routine_id")
    private ClassRoutine classRoutine;

    private LocalDate date;

//    private DayOfWeek day;

    private String status;
}
