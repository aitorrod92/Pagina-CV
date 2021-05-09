package com.AitorRodriguez.SpringCVWeb.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.AitorRodriguez.SpringCVWeb.entity.Trabajo;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "trabajo", path="trabajos")
public interface TrabajoRepository extends  PagingAndSortingRepository<Trabajo, Integer> {}