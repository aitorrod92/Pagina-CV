package com.AitorRodriguez.SpringCVWeb.DAO;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "information", path="informations")
public interface InformationRepository extends CrudRepository<com.AitorRodriguez.SpringCVWeb.entity.Information, Long> {

}