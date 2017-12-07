package com.craut.project.craut.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequestDto implements Dto{
    private String content;
    private String dwy;
    private String image;
    private int money;
    private String name;
    private String purpose;
}
