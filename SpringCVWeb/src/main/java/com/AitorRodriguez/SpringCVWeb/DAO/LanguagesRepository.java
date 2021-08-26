package com.AitorRodriguez.SpringCVWeb.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.AitorRodriguez.SpringCVWeb.entity.Idioma;
import com.AitorRodriguez.SpringCVWeb.entity.Language;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "language", path="languages")
public interface LanguagesRepository extends  PagingAndSortingRepository<Language, Long> {
	Page<Language> findByTagsContaining(@RequestParam("tags") String tags, Pageable pageable);
	
}