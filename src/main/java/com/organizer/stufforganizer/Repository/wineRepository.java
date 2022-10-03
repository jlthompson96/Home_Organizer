package com.organizer.stufforganizer.Repository;

import com.organizer.stufforganizer.Entity.wineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface wineRepository extends JpaRepository<wineEntity, Integer> {
}

