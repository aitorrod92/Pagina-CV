package com.AitorRodriguez.SpringCVWeb.DAO;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.AitorRodriguez.SpringCVWeb.entity.Idioma;
import com.AitorRodriguez.SpringCVWeb.entity.Language;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "language", path="languages")
public interface LanguagesRepository extends  PagingAndSortingRepository<Language, Long> {

}