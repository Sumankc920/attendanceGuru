package com.arun.ag_backend.Repo;

import com.arun.ag_backend.Entities.Attendance;
import com.arun.ag_backend.Entities.Class;
import com.arun.ag_backend.Entities.ClassRoutine;
import com.arun.ag_backend.Entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Repository
public interface AttendanceRepo extends JpaRepository<Attendance, Integer> {

    @Query("SELECT COUNT(a) > 0 FROM Attendance a " +
            "WHERE a.student = :student " +
            "AND a.classRoutine = :classRoutine " +
            "AND a.date = :date ")

    boolean existsSameAttendance(
            @Param("student") Student student,
            @Param("classRoutine") ClassRoutine classRoutine,
            @Param("date") LocalDate date

    );

}
