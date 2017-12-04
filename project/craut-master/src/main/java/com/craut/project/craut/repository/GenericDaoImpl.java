package com.craut.project.craut.repository;

import com.craut.project.craut.model.Generic;
import com.craut.project.craut.model.ProjectEntity;
import com.craut.project.craut.service.dto.ProjectRequestDto;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public class GenericDaoImpl<T>  {

    @Autowired
    private SessionFactory sessionFactory;

    public void save(T p) {
        Session session = getSession();
        session.saveOrUpdate(p);
    }
    public List<T> sortByDesc(String tableName,String columnName) {
        Session session = getSession();
        Query query=session.createSQLQuery("SELECT * FROM "+tableName+" ORDER BY " + columnName +" DESC");
        List<T> object=query.list();
        return object;
    }
    public List<T> sortByAsc(String tableName,String columnName) {
        Session session = getSession();
        Query query=session.createSQLQuery("SELECT * FROM "+tableName+" ORDER BY " + columnName +" ASC");
        List<T> object= (List<T>)query.list();
        return object;
    }
    public void deletObject(Generic<T> object) {
        Session session = this.sessionFactory.openSession();
        Transaction tx = session.beginTransaction();
        session.delete(object);
        tx.commit();
        session.close();
    }
    public void del(T obj)
    {
        Session session =getSession();
        session.delete(obj);
    }
    public List<T> list(String tablename)
    {
        Session session =getSession();
        String q="FROM "+tablename;
        Query query=session.createQuery(q);
        List<T> object=query.list();
        return object;
    }
    public void update(String tableName,String column,T parametr,String changeColumn,T changeParametr)
    {
            Session session =getSession();
            String q = "UPDATE " + tableName + " set "+changeColumn+"="+changeParametr
                    +" where "+column+" ="+parametr;
            Query query=session.createQuery(q);
            int result = query.executeUpdate();
    }
    public void delete(String tableName,String column,T parametr)
    {
        Session session =getSession();
        Query query =  session.createQuery("delete  " + tableName+"  where "+column+" ="+parametr);
        int result = query.executeUpdate();
    }
    public T findByParametr(T userName, String tableName,String parametr) {
        Session session =getSession();
        String q="FROM "+tableName+" m WHERE m."+parametr+"=:"+parametr;
        Query query=session.createQuery(q);
        query.setParameter(parametr,userName);

        List<Generic<T>> object=query.list();
        if(object!=null &&!object.isEmpty()){
            T t = (T) object.get(0);
            return t;
        }else{
            return null;
        }
    }
    public List<ProjectRequestDto> fullTextSearch(String search){
        Session session = getSession();
        Query query = session.createSQLQuery("SELECT * FROM project WHERE MATCH (name,content,purpose) AGAINST ('*"+search+"*' IN BOOLEAN MODE)");
        List<ProjectRequestDto> object = query.list();
        return object;
    }
    public T findByTwoParametr(T parametr, String tableName,String column,String column2 , T parametr2) {
        Session session =getSession();
        String q="FROM "+tableName+" m WHERE m."+column+"=:"+column + " AND m." + column2+"=:"+column2;
        Query query=session.createQuery(q);
        query.setParameter(column,parametr);
        query.setParameter(column2,parametr2);
        List<Generic<T>> object=query.list();
        if(object!=null &&!object.isEmpty()){
            T t = (T) object.get(0);
            return t;
        }else{
            return null;
        }
    }
    public T findById(T t, Long id) {
        Session session =getSession();
       return (T)session.get(t.getClass(),id);
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public Session getSession() {
        return this.sessionFactory.getCurrentSession();

    }
}
