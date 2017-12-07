package com.craut.project.craut.service;

import com.craut.project.craut.model.Generic;
import com.craut.project.craut.model.UserEntity;
import com.craut.project.craut.model.UserRoleEntity;
import com.craut.project.craut.repository.GenericDao;
import com.craut.project.craut.repository.GenericDaoImpl;
import com.craut.project.craut.repository.UserRepository;
import com.craut.project.craut.security.SecurityHelper;
import com.craut.project.craut.security.model.JwtUserDetails;
import com.craut.project.craut.security.service.AuthenticationHelper;
import com.craut.project.craut.service.dto.AuthUserDto;
import com.craut.project.craut.service.dto.JsonException;
import com.craut.project.craut.service.dto.LoginRequestDto;
import com.craut.project.craut.service.dto.LoginResponseDto;
import com.craut.project.craut.service.transformer.AuthUserTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

/**
 * @author ikatlinsky
 * @since 5/12/17project
 */
@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    GenericDaoImpl genericDaoImpl;

    private final AuthUserTransformer authUserTransformer;
    private final AuthenticationHelper authenticationHelper;

    public LoginResponseDto login(final LoginRequestDto loginRequestDto) {
        try {
            genericDaoImpl.list("RolesEntity");

            String username = Optional.ofNullable(loginRequestDto.getUsername())
                    .orElseThrow(() -> new BadCredentialsException("Username should be passed."));

            String password = Optional.ofNullable(loginRequestDto.getPassword())
                    .orElseThrow(() -> new BadCredentialsException("Password should be passed."));

            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username,
                    password);

            // Try to authenticate with this token
            //Authentication authResult = this.authenticationManager.authenticate(authRequest);

            // Set generated JWT token to response header
            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                UserEntity user = (UserEntity)genericDaoImpl.findByTwoParametr((String)authRequest.getPrincipal(),"UserEntity","userName","password",(String)authRequest.getCredentials());
                UserRoleEntity userRoleEntity = (UserRoleEntity)genericDaoImpl.findByParametr(user,"UserRoleEntity","user");
                if (Objects.isNull(userRoleEntity)) {
                    throw new JsonException("User not exist in system.");
                }
                if (user.getBlocked()==3)
                {
                    throw new JsonException("Account not verified");
                }
                JwtUserDetails userDetails = new JwtUserDetails(userRoleEntity);
                String token = this.authenticationHelper.generateToken(userDetails.getId());

                return new LoginResponseDto(token);
            } else {
                throw new JsonException("Authentication failed.");
            }

        } catch (BadCredentialsException exception) {
            throw new JsonException("Username or password was incorrect. Please try again.", exception);
        }
    }

    /**
     * Get user info.
     * @return user info.
     */
    @Transactional(readOnly = true)
    public AuthUserDto getMe() {
        Authentication authentication = SecurityHelper.getAuthenticationWithCheck();
        UserEntity userEntity =(UserEntity)genericDaoImpl.findByParametr(authentication.getName(),"UserEntity","userName");
        UserRoleEntity userRoleEntity = (UserRoleEntity)genericDaoImpl.findByParametr(userEntity,"UserRoleEntity","user");
        //Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        //grantedAuthorities.add(new SimpleGrantedAuthority(userRoleEntity.getRole().getRoleStatus()));
        //new org.springframework.security.core.userdetails.User(userEntity.getEmail(), userEntity.getPassword(), grantedAuthorities);
        return authUserTransformer.makeDto(userRoleEntity);
    }
}
