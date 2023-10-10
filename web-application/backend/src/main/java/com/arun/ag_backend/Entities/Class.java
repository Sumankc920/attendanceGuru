package com.arun.ag_backend.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.service.annotation.GetExchange;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int class_id;

    private String faculty;

    private int semester;
    private String shift;

    private int room_no;

    @Override
    public String toString() {
        return "ClassDetails{" +
                "faculty='" + faculty + '\'' +
                ", semester=" + semester +
                ", shift='" + shift + '\'' +
                ", room_no=" + room_no +
                '}';
    }
}
