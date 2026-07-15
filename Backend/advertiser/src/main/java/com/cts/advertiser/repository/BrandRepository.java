package com.cts.advertiser.repository;

import java.util.*;
import java.math.BigDecimal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.advertiser.entity.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> { 

    List<Brand> findByAdvertiserId(Integer advertiserId);

    @Query("SELECT COALESCE(SUM(b.allocatedBudget), 0) FROM Brand b WHERE b.advertiserId = :advertiserId")
    BigDecimal sumAllocatedBudgetByAdvertiserId(@Param("advertiserId") Integer advertiserId);

    @Query("SELECT COALESCE(SUM(b.allocatedBudget), 0) FROM Brand b WHERE b.advertiserId = :advertiserId AND b.brandId <> :excludeBrandId")
    BigDecimal sumAllocatedBudgetByAdvertiserExcludingBrand(@Param("advertiserId") Integer advertiserId, @Param("excludeBrandId") Integer excludeBrandId);

}