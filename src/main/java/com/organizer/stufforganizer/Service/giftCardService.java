package com.organizer.stufforganizer.Service;

import com.organizer.stufforganizer.Entity.giftCardEntity;
import com.organizer.stufforganizer.Repository.giftCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class giftCardService {

    @Autowired
    private giftCardRepository giftCardRepo;

    public List<giftCardEntity> getGiftCardList(){return giftCardRepo.findAll();}

    public giftCardEntity getGiftCardById(int id){return giftCardRepo.findById(id).get();}

    public void saveOrUpdateGiftCard(giftCardEntity giftCard){giftCardRepo.save(giftCard);}

    public void delete(int id){giftCardRepo.deleteById(id);}


}
