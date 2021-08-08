package com.AitorRodriguez.SpringCVWeb.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.AitorRodriguez.SpringCVWeb.entity.Categoria;
import com.AitorRodriguez.SpringCVWeb.entity.Category;
import com.AitorRodriguez.SpringCVWeb.entity.Idioma;
import com.AitorRodriguez.SpringCVWeb.entity.Job;
import com.AitorRodriguez.SpringCVWeb.entity.Keyword;
import com.AitorRodriguez.SpringCVWeb.entity.Trabajo;

@Configuration
public class MyDataRESTConfig implements RepositoryRestConfigurer {

	private EntityManager entityManager;
	private HttpMethod[] theUnsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE };
	private Class[] clases = { Trabajo.class, Job.class, Categoria.class, Category.class, Idioma.class, Keyword.class };
	private int pageSize = 100; // A cambiar si se incluyen más palabras clave

	@Autowired
	public MyDataRESTConfig(EntityManager theEntityManager) {
		this.entityManager = theEntityManager;
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		disableHttpMethods(config, clases);
		exposeIds(config);
		config.setDefaultPageSize(pageSize);
	}

	private void disableHttpMethods(RepositoryRestConfiguration config, 
									@SuppressWarnings("rawtypes") Class[] clases) {
		for (@SuppressWarnings("rawtypes")Class clase : clases) {
			config.getExposureConfiguration().forDomainType(clase)
					.withItemExposure((metdata, httpMethods) 
							-> httpMethods.disable(theUnsupportedActions))
					.withCollectionExposure((metdata, httpMethods) 
							-> httpMethods.disable(theUnsupportedActions));
		}
	}

	private void exposeIds(RepositoryRestConfiguration config) {
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		@SuppressWarnings("rawtypes")
		List<Class> entityClasses = new ArrayList();
		for (@SuppressWarnings("rawtypes")
		EntityType tempEntityType : entities) {
			entityClasses.add(tempEntityType.getJavaType());
		}
		@SuppressWarnings("rawtypes")
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
	}
}
