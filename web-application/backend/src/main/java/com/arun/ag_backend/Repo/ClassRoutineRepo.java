package com.arun.ag_backend.Repo;

import com.arun.ag_backend.Entities.ClassRoutine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ClassRoutineRepo extends JpaRepository<ClassRoutine , Long> {

    @Query("SELECT cr FROM ClassRoutine cr " +
            "WHERE cr.dayOfWeek = :dayOfWeek " +
            "AND cr.startTime <= :captureTime " +
            "AND cr.endTime >= :captureTime " +
            "AND cr.aClass.room_no = :roomNo")
    ClassRoutine findByDayAndTimeAndRoom(
            @Param("dayOfWeek") DayOfWeek dayOfWeek,
            @Param("captureTime") LocalTime captureTime,
            @Param("roomNo") int roomNo
    );
}
