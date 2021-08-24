package com.AitorRodriguez.SpringCVWeb.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import com.AitorRodriguez.SpringCVWeb.entity.Keyword;
import com.AitorRodriguez.SpringCVWeb.entity.Palabraclave;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "palabraclave", path="palabrasclave")
public interface PalabrasclaveRepository extends  PagingAndSortingRepository<Palabraclave, Long> {

}