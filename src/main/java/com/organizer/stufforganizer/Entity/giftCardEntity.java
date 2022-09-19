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
public class giftCardEntity implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "vendor")
    private String vendor;

    @Column(name = "amount")
    private String amount;

    @Column(name = "fuel_points_earned")
    private String fuelPointsEarned;

    @Column(name = "date_purchased")
    private String datePurchased;

    @Column(name = "location")
    private String location;

    @Column(name = "used")
    private String used;
}
