package com.arun.ag_backend.Repo;

import com.arun.ag_backend.Entities.*;
import com.arun.ag_backend.Entities.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepo extends JpaRepository<Teacher, Integer > {
    @Query("SELECT t FROM Teacher t WHERE t.user.email = :email")
    Optional<Teacher> findByUserEmail(@Param("email") String email);

    @Query("SELECT u.name , u.email FROM Users u WHERE u.role = 'teacher'")
    List<Object> findAllTeachers();

    @Query("SELECT   c FROM Class c " +
            "JOIN TeacherSubjects ts ON c.class_id = ts.aClass.class_id " +
            "JOIN Users u ON ts.users.email = u.email " +
            "JOIN Subject s ON ts.subject.subject_id = s.subject_id " +
            "WHERE u.email = :email")
    List<Class> findTeacherSubjectsByEmail(@Param("email") String email);

    @Query("SELECT subject FROM Subject subject " +
            "JOIN TeacherSubjects ts on subject.subject_id = ts.subject.subject_id " +
            "WHERE ts.aClass.class_id = :classId AND ts.users.email = :email")
    Subject findTeacherSubject(@Param("classId") int classId, @Param("email") String email);


    @Query("SELECT u.email , u.name , u.role FROM Users u " +
            "JOIN Teacher  t on u.id =  t.user.id " +
             "join TeacherSubjects ts on t.user.email = ts.users.email " +
            "join Class c on ts.aClass.class_id = c.class_id " +
            " join ClassSubjects cs on ts.aClass.class_id = cs.aClass.class_id" +
            " join Subject st on cs.subject.subject_id = st.subject_id " +
            "WHERE c.semester  = :semester  and c.shift = :shift and st.short_name = :subject_name ")
    Object findTeacherBySemAndShiftAndSubject(@Param("subject_name") String subject_name ,@Param("semester") int semester , @Param("shift") String shift);


}
