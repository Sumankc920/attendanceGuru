package com.arun.ag_backend.Entities;


import lombok.Data;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "students")
public class Student {


    @Id
    @Column(name = "roll_no")
    private int roll;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;



    @ManyToOne
    @JoinColumn(name="class_id")
    private Class aClass;
}
