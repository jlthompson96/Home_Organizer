package com.organizer.stufforganizer.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class wineEntity implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "wineType")
    private String wineType;

    @Column(name = "wineValue")
    private String wineValue;

    @Column(name = "wineBrand")
    private String wineBrand;

    @Column(name = "location")
    private String location;

    @Column(name = "datePurchased")
    private String datePurchased;

}
