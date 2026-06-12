package com.cts.advertiser.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.advertiser.entity.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> { 

    List<Brand> findByAdvertiserId(Integer advertiserId);

}