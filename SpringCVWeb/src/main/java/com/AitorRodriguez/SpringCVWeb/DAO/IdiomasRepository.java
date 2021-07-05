package com.AitorRodriguez.SpringCVWeb.DAO;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.AitorRodriguez.SpringCVWeb.entity.Idioma;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "idioma", path="idiomas")
public interface IdiomasRepository extends  PagingAndSortingRepository<Idioma, Long> {

}