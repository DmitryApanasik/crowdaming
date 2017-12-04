package com.craut.project.craut.security.model;

import com.craut.project.craut.model.UserEntity;
import com.craut.project.craut.model.UserRoleEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * @author ikatlinsky
 * @since 5/12/17
 */
@Getter
public class JwtUserDetails implements UserDetails {

    private Long id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String image;
    private int blocked;
    private Set<GrantedAuthority> authorities;

    public JwtUserDetails(UserRoleEntity userRoleEntity) {
        this.id = userRoleEntity.getIdusers_roles();
        this.username = userRoleEntity.getUser().getUserName();
        this.password = userRoleEntity.getUser().getPassword();
        this.firstName = userRoleEntity.getUser().getFirstName();
        this.lastName = userRoleEntity.getUser().getLastName();
        this.blocked = userRoleEntity.getUser().getBlocked();
        this.email = userRoleEntity.getUser().getEmail();
        this.image =userRoleEntity.getUser().getImage();
        this.authorities = new HashSet<>();
        this.authorities.add(new SimpleGrantedAuthority(userRoleEntity.getRole().getRoleStatus()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
