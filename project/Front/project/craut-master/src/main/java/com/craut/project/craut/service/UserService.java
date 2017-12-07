package com.craut.project.craut.service;

import com.craut.project.craut.model.MessageEntity;
import com.craut.project.craut.model.RolesEntity;
import com.craut.project.craut.model.UserEntity;
import com.craut.project.craut.model.UserRoleEntity;
import com.craut.project.craut.repository.GenericDao;
import com.craut.project.craut.repository.GenericDaoImpl;
import com.craut.project.craut.repository.UserRepository;
import com.craut.project.craut.security.model.TokenPayload;
import com.craut.project.craut.security.service.AuthenticationHelper;
import com.craut.project.craut.service.dto.MessageRequestDto;
import com.craut.project.craut.service.dto.ProjectRequestDto;
import com.craut.project.craut.service.dto.RegistrtionRequestDto;
import com.craut.project.craut.service.dto.UserListDto;
import com.craut.project.craut.service.transformer.UserListTransformer;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * @author ikatlinsky
 * @since 5/12/17
 */
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    @Autowired
    GenericDaoImpl genericDaoImpl;

    private final AuthenticationHelper authenticationHelper;

    public String update(final RegistrtionRequestDto registrtionRequestDto, String token) {
        TokenPayload tokenPayload = authenticationHelper.decodeToken(token);
        Long userRoleEntityId = tokenPayload.getUserId();
        UserRoleEntity userRoleEntity = (UserRoleEntity) genericDaoImpl.findById(new UserRoleEntity(),
                userRoleEntityId);
        userRoleEntity.getUser().setImage(registrtionRequestDto.getImage());
        userRoleEntity.getUser().setFirstName(registrtionRequestDto.getFirstName());
        userRoleEntity.getUser().setLastName(registrtionRequestDto.getLastName());
        userRoleEntity.getUser().setEmail(registrtionRequestDto.getEmail());
        userRoleEntity.getUser().setPassword(registrtionRequestDto.getPassword());
        userRoleEntity.getUser().setUserName(registrtionRequestDto.getUsername());
        genericDaoImpl.save(userRoleEntity);
        return "sucess";
    }


    @Transactional(readOnly = true)
    public List<UserListDto> findAll() {
        return genericDaoImpl.list("UserEntity");
    }

    public String blockUser(ArrayList<Long> blockRequestDto, String token){
        for(Long block:blockRequestDto)
        {
            genericDaoImpl.update("UserEntity","iduser",block,"blocked",3);
        }
        return "public String blockUser(ArrayList<Long> blockRequestDto, String token){success";
    }

    public String blockUser(ArrayList<Long> blockRequestDto){
        Long choose = blockRequestDto.get(0);
        blockRequestDto.remove(0);
        for(Long block:blockRequestDto)
        {
            if(choose == 0)
                genericDaoImpl.update("UserEntity","iduser",block,"blocked",3);
            if(choose == 1 )
                genericDaoImpl.update("UserEntity","iduser",block,"blocked",1);
            if(choose == 2) {
                UserEntity user = (UserEntity)genericDaoImpl.findById(new UserEntity(),block);
                UserRoleEntity roleEntity = (UserRoleEntity)genericDaoImpl.findByParametr(user,"UserRoleEntity","user");
//                genericDaoImpl.delete("UserEntity", "iduser", block);
                genericDaoImpl.del(roleEntity);
            }
        }
        return "success";
    }

    public String confirmUser(MessageRequestDto confirm, String token) {
        TokenPayload tokenPayload = authenticationHelper.decodeToken(token);
        Long userRoleEntityId = tokenPayload.getUserId();
        UserRoleEntity user = (UserRoleEntity)genericDaoImpl.findById(new UserRoleEntity(),userRoleEntityId);
        RolesEntity role = (RolesEntity) genericDaoImpl.findByParametr("admin","RolesEntity",
                "roleStatus");
        UserRoleEntity admin = (UserRoleEntity) genericDaoImpl.findByParametr(role,
                "UserRoleEntity","role");
        MessageEntity messageEntity = new MessageEntity(confirm.getText(),"потверждение ящика",
                confirm.getImage(),user,admin);
        genericDaoImpl.save(messageEntity);
        return "success";
    }
    public List<ProjectRequestDto> fullTextSearch(String search)
    {
        return  genericDaoImpl.fullTextSearch(search);
    }
}
