package com.AitorRodriguez.SpringCVWeb.DAO;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "exception", path="exceptions")
public interface ExceptionsRepository {
	public void save(com.AitorRodriguez.SpringCVWeb.entity.Exception exception);
}