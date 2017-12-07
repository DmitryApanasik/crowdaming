package com.craut.project.craut.model;
import javax.persistence.*;

@Entity
@Table(name = "message")
public class MessageEntity {

    @Id
    @Column(name = "idmassage")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idmessage;

    @Column(name = "text")
    private String text;

    @Column(name = "theme")
    private String theme;

    @Column(name = "image")
    private String image;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "addressee")
    private UserRoleEntity addressee;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "recipient")
    private UserRoleEntity recipient;

    public MessageEntity(String text, String theme, String image, UserRoleEntity addressee, UserRoleEntity recipient) {
        this.text = text;
        this.theme = theme;
        this.image = image;
        this.addressee = addressee;
        this.recipient = recipient;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public UserRoleEntity getAt() {
        return addressee;
    }

    public void setAt(UserRoleEntity addressee) {
        this.addressee = addressee;
    }

    public UserRoleEntity getTo() {
        return recipient;
    }

    public void setTo(UserRoleEntity recipient) {
        this.recipient = recipient;
    }

    public Integer getIdmessage() {
        return idmessage;
    }

    public void setIdmessage(Integer idmessage) {
        this.idmessage = idmessage;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

   }
