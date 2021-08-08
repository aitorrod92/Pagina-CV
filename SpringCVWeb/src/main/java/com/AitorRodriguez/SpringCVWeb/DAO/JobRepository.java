package com.AitorRodriguez.SpringCVWeb.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import com.AitorRodriguez.SpringCVWeb.entity.Job;


@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "job", path="jobs")
public interface JobRepository extends  PagingAndSortingRepository<Job, Long> {
	Page<Job> findByCiudad(@RequestParam("ciudad") String ciudad, Pageable pageable);
	
	Page<Job> findByTagsContaining(@RequestParam("tags") String tags, Pageable pageable);
	
	Page<Job> findByCategoria(@RequestParam("categoria") Long categoria, Pageable pageable);
}