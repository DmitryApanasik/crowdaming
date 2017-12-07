package com.craut.project.craut.repository;

import com.craut.project.craut.model.Generic;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public interface GenericDao<T> {

    public void save(Generic<T> p);

    public List<Generic<T>> list(String name);

    public void deletObject(Generic<T> object);

    public Generic<T> findByUserName(String userName, String tableName);
}
