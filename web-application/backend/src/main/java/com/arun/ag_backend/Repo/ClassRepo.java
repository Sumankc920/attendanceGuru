package com.arun.ag_backend.Repo;

import com.arun.ag_backend.Entities.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClassRepo extends JpaRepository<Class , Integer> {

    @Query("SELECT c from Class c where c.room_no = :room_no")
    Optional<Class> findByRoom_no(@Param("room_no") int room_no);

}
