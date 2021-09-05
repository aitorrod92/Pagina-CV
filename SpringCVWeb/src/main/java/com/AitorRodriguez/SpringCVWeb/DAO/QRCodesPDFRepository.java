package com.AitorRodriguez.SpringCVWeb.DAO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import com.AitorRodriguez.SpringCVWeb.entity.Categoria;
import com.AitorRodriguez.SpringCVWeb.entity.QRCodesPDF;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "QRCodesPDF", path="QRCodesPDF")
public interface QRCodesPDFRepository extends  PagingAndSortingRepository<QRCodesPDF, Long> {
	
	Page<QRCodesPDF> findByLanguage(@RequestParam("language") String language, Pageable pageable);
}