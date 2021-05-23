package com.AitorRodriguez.SpringCVWeb.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.AitorRodriguez.SpringCVWeb.entity.Trabajo;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "trabajo", path="trabajos")
public interface TrabajoRepository extends  PagingAndSortingRepository<Trabajo, Long> {
	Page<Trabajo> findByCiudad(@RequestParam("ciudad") String ciudad, Pageable pageable);
	
	Page<Trabajo> findByTagsContaining(@RequestParam("tags") String tags, Pageable pageable);
	
	Page<Trabajo> findByCategoria(@RequestParam("categoria") Long categoria, Pageable pageable);
}