package com.organizer.stufforganizer.Repository;

import com.organizer.stufforganizer.Entity.giftCardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface giftCardRepository extends JpaRepository<giftCardEntity, Integer> {
}

