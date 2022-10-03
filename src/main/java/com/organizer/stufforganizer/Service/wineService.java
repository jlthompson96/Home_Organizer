package com.organizer.stufforganizer.Service;

import com.organizer.stufforganizer.Entity.wineEntity;
import com.organizer.stufforganizer.Repository.wineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class wineService {

    @Autowired
    private wineRepository wineRepo;

    public List<wineEntity> getWineList() {
        return wineRepo.findAll();
    }

    public wineEntity getWineById(int id) {
        return wineRepo.findById(id).get();
    }

    public void saveOrUpdate(wineEntity wine) {
        wineRepo.save(wine);
    }

    public void delete(int id) {
        wineRepo.deleteById(id);
    }
}
