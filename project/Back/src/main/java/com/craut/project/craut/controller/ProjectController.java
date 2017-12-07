package com.craut.project.craut.controller;

import com.craut.project.craut.service.dto.ProjectAndTagsRequestDto;
import com.craut.project.craut.model.ProjectEntity;
import com.craut.project.craut.service.ProjectService;
import com.craut.project.craut.service.dto.CommentRequestDto;
import com.craut.project.craut.service.dto.ProjectMoney;
import com.craut.project.craut.service.dto.ProjectRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping(value = "/sendData", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
//    public String finalAll( @RequestBody final ProjectRequestDto projectRequestDto) {
    public String finalAll( @RequestBody ProjectAndTagsRequestDto projectRequestDto) {
        return this.projectService.save(projectRequestDto.getProjectRequestDto(),projectRequestDto.getTags());
    }
    @PostMapping(value = "/getProjects",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
    public List<ProjectRequestDto> projects(@RequestBody final Long data) {
        return projectService.getProjects(data);
    }

    @PostMapping(value = "/idProject", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
    public ProjectEntity getIdProject(
            @RequestBody final Object idproject) {
        ProjectEntity a = projectService.getProject(idproject);
        return a;
    }

    @PostMapping(value = "/comment", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
    public String addComment( @RequestBody final CommentRequestDto commentRequestDto
    ) {
        projectService.AddComment(commentRequestDto);
        return "success";
    }
    @PostMapping(value = "/projectMoney", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
    public String addMoney(@RequestBody final ProjectMoney projectMoney
                           ) {
        projectService.addMoney(projectMoney);
        return "success";
    }
}
