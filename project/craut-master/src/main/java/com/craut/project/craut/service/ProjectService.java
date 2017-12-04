package com.craut.project.craut.service;

import com.craut.project.craut.model.CommentsEntity;
import com.craut.project.craut.model.ProjectEntity;
import com.craut.project.craut.model.StatusEntity;
import com.craut.project.craut.model.UserEntity;
import com.craut.project.craut.repository.GenericDaoImpl;
import com.craut.project.craut.service.dto.CommentRequestDto;
import com.craut.project.craut.service.dto.ProjectMoney;
import com.craut.project.craut.service.dto.ProjectRequestDto;
import com.craut.project.craut.service.dto.RatingRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectService {
    @Autowired
    GenericDaoImpl genericDaoImpl;
    public String save(ProjectRequestDto projectRequestDto, List<Object> tags)
    {
        ProjectEntity projectEntity = new ProjectEntity(projectRequestDto.getName(),projectRequestDto.getDwy(),
                projectRequestDto.getImage(),projectRequestDto.getPurpose(),projectRequestDto.getMoney(),0,null,
                projectRequestDto.getContent());
        genericDaoImpl.save(projectEntity);

        return "success";
    }
    public ProjectEntity getProject(Object idproject){
        return (ProjectEntity) genericDaoImpl.findById(new ProjectEntity(),Long.parseLong(idproject.toString()));
    }
    public void addMoney(ProjectMoney projectMoney){
        ProjectEntity projectEntity = (ProjectEntity)genericDaoImpl.findById(new ProjectEntity(),projectMoney.getIdProject());
        projectEntity.setCash(projectEntity.getCash()+projectMoney.getMoney());
        genericDaoImpl.save(projectEntity);
    }
    public void AddComment(CommentRequestDto commentRequestDto){
        System.out.println(commentRequestDto.getIdproject() + " "+ commentRequestDto.getIduser());
        ProjectEntity projectEntity = (ProjectEntity)genericDaoImpl.findById(new ProjectEntity(),commentRequestDto.getIdproject());
        UserEntity userEntity = (UserEntity)genericDaoImpl.findById(new UserEntity(),commentRequestDto.getIduser());

        CommentsEntity commentsEntity = new CommentsEntity(commentRequestDto.getComment(),projectEntity,userEntity);
        genericDaoImpl.save(commentsEntity);
    }

//    public List<ProjectRequestDto> getProjects(){
//        return genericDaoImpl.list("ProjectEntity");
//    }

    public List<ProjectRequestDto> getProjects(Long data){
        if(data == 0) {
            return genericDaoImpl.list("ProjectEntity");
        }
        else if(data == 1){
            return genericDaoImpl.sortByAsc("ProjectEntity","rating");
        }
        else {
            if(data == 2){
                return genericDaoImpl.sortByAsc("ProjectEntity","dwy");
            }else
            return genericDaoImpl.list("ProjectEntity");
        }
    }
    public String setTags(List<String> tags){
        return null;
    }

    public String setRating(RatingRequestDto rating){
        ProjectEntity currentProject = (ProjectEntity)genericDaoImpl.findById
                (new ProjectEntity(),Long.parseLong(rating.getIdproject().toString()));
        if(currentProject.getRating() == 0){
//            currentProject.setRating(Long.parseLong(rating.getRating().toString()));
            genericDaoImpl.update("ProjectEntity","idproject",currentProject.getIdproject(),"rating", (Long.parseLong(rating.getRating().toString())));
        }
        else{
            genericDaoImpl.update("ProjectEntity","idproject",currentProject.getIdproject(),"rating",
                    (currentProject.getRating() + Long.parseLong(rating.getRating().toString()))/2);
        }
        return "succes";
    }
}
