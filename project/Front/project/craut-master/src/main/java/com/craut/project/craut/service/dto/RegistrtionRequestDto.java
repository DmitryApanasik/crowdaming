package com.craut.project.craut.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author i.katlinsky
 * @since 21.07.2016
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistrtionRequestDto implements Dto {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String image;


}
