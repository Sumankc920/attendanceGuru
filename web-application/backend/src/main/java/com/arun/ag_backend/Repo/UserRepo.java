package com.arun.ag_backend.Repo;

import com.arun.ag_backend.Entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer>{

    @Query("select  u from  Users u where u.email = :email")
    Optional<Users> findByEmail(@Param("email") String email);

    @Modifying
    @Query("UPDATE Users u SET u.is_enabled = :newEnabledValue WHERE u.email = :email")
    void updateIsEnabledByEmail(@Param("newEnabledValue") boolean newEnabledValue, @Param("email") String email);


}