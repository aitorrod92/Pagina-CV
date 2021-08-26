package com.AitorRodriguez.SpringCVWeb.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.AitorRodriguez.SpringCVWeb.entity.Idioma;
import com.AitorRodriguez.SpringCVWeb.entity.Trabajo;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "idioma", path="idiomas")
public interface IdiomasRepository extends  PagingAndSortingRepository<Idioma, Long> {

	Page<Idioma> findByTagsContaining(@RequestParam("tags") String tags, Pageable pageable);
	
}