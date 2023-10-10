package com.arun.ag_backend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private int subject_id;

    private String name;

    private String short_name;

    private int credit_hours;

    @Override
    public String toString() {
        return "Subject{" +
                "name='" + name + '\'' +
                ", short_name='" + short_name + '\'' +
                ", credit_hours=" + credit_hours +
                '}';
    }
}
