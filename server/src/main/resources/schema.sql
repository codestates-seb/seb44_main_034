

DROP TABLE posts IF EXISTS;

CREATE TABLE posts (
    post_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    createdAt DATETIME,
    updatedAt DATETIME,
    post_content TEXT,
    post_image TEXT,
    star_rating INT,
    post_title VARCHAR(255),
    cafe_id BIGINT,
    member_id BIGINT,
    CONSTRAINT fk_member
        FOREIGN KEY (member_id) REFERENCES Member (MEMBER_ID)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT fk_cafe
        FOREIGN KEY (cafe_id) REFERENCES cafes (cafe_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

DROP TABLE PostBookmark IF EXISTS;

CREATE TABLE PostBookmark (
    postBookmarkId BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT,
    post_id BIGINT,
    CONSTRAINT fk_member
        FOREIGN KEY (member_id) REFERENCES Member (MEMBER_ID)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT fk_post
        FOREIGN KEY (post_id) REFERENCES posts (post_id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

DROP TABLE post_tag IF EXISTS;

CREATE TABLE post_tag (
    post_tag_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cafe_id BIGINT,
    post_id BIGINT,
    tag_id BIGINT,
    CONSTRAINT fk_tag
        FOREIGN KEY (tag_id) REFERENCES tag (tag_id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT fk_cafe
        FOREIGN KEY (cafe_id) REFERENCES cafes (cafe_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE,
    CONSTRAINT fk_post
        FOREIGN KEY (post_id) REFERENCES posts (post_id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

DROP TABLE tag IF EXISTS;

CREATE TABLE tag (
    tag_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(255)
);

DROP TABLE comments IF EXISTS;

CREATE TABLE comments (
    comment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    createdAt DATETIME,
    updatedAt DATETIME,
    content VARCHAR(255),
    member_id BIGINT,
    parent_comment_id BIGINT,
    post_id BIGINT,
    CONSTRAINT fk_parent_comment
        FOREIGN KEY (parent_comment_id) REFERENCES comments (comment_id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT fk_post
        FOREIGN KEY (post_id) REFERENCES posts (post_id)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT fk_member
        FOREIGN KEY (member_id) REFERENCES Member (MEMBER_ID)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

DROP TABLE cafes IF EXISTS;

CREATE TABLE cafes (
    cafe_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    createdAt DATETIME,
    updatedAt DATETIME,
    address VARCHAR(255),
    close_time VARCHAR(255),
    contact VARCHAR(255),
    has_dessert BIT(1),
    has_parking BIT(1),
    cafe_image TEXT,
    is_charging_available BIT(1),
    is_open_all_time BIT(1),
    is_pet_friendly BIT(1),
    latitude DOUBLE,
    longitude DOUBLE,
    cafe_name VARCHAR(255),
    notice VARCHAR(255),
    open_time VARCHAR(255),
    rating FLOAT,
    short_address VARCHAR(255),
    owner_id BIGINT,
    CONSTRAINT fk_owner
        FOREIGN KEY (owner_id) REFERENCES Owner (OWNER_ID)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

DROP TABLE cafe_bookmarks IF EXISTS;

CREATE TABLE cafe_bookmarks (
    cafe_bookmark_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cafe_id BIGINT,
    member_id BIGINT,
    CONSTRAINT fk_cafe
        FOREIGN KEY (cafe_id) REFERENCES cafes (cafe_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE,
    CONSTRAINT fk_member
        FOREIGN KEY (member_id) REFERENCES Member (MEMBER_ID)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

DROP TABLE menus IF EXISTS;

CREATE TABLE menus (
    menu_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    menu_type VARCHAR(255),
    menu_name VARCHAR(255),
    price INT,
    cafe_id BIGINT,
    CONSTRAINT fk_cafes
        FOREIGN KEY (cafe_id) REFERENCES cafes (cafe_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE
);

DROP TABLE menu_comments IF EXISTS;

CREATE TABLE menu_comments (
    menu_comment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    createdAt DATETIME,
    updatedAt DATETIME,
    menu_content VARCHAR(255),
    member_id BIGINT,
    menu_id BIGINT,
    CONSTRAINT fk_menu
        FOREIGN KEY (menu_id) REFERENCES menus (menu_id)
        ON UPDATE RESTRICT
        ON DELETE CASCADE,
    CONSTRAINT fk_member
        FOREIGN KEY (member_id) REFERENCES Member (MEMBER_ID)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);
DROP TABLE Member IF EXISTS;

CREATE TABLE Member (
    MEMBER_ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    createdAt DATETIME,
    updatedAt DATETIME,
    displayName VARCHAR(100),
    MEMBER_EMAIL VARCHAR(100),
    grade VARCHAR(30),
    PROFILE_IMAGE TEXT,
    isPrivacy BIT(1),
    MEMBER_PASSWORD VARCHAR(100),
    MEMBER_STATUS VARCHAR(30)
);

CREATE TABLE Member_roles (
    Member_MEMBER_ID BIGINT,
    roles VARCHAR(255),
    CONSTRAINT fk_member_roles
        FOREIGN KEY (Member_MEMBER_ID) REFERENCES Member (MEMBER_ID)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

DROP TABLE Follow IF EXISTS;

CREATE TABLE Follow (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    FOLLOWER_ID BIGINT,
    FOLLOWING_ID BIGINT,
    CONSTRAINT fk_follower
        FOREIGN KEY (FOLLOWER_ID) REFERENCES Member (MEMBER_ID)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT,
    CONSTRAINT fk_following
        FOREIGN KEY (FOLLOWING_ID) REFERENCES Member (MEMBER_ID)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

DROP TABLE Owner IF EXISTS;

CREATE TABLE Owner (
    OWNER_ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    createdAt DATETIME,
    updatedAt DATETIME,
    OWNER_DISPLAYNAME VARCHAR(255),
    OWNER_EMAIL VARCHAR(255),
    OWNER_STATUS VARCHAR(255),
    OWNER_PASSWORD VARCHAR(255)
);

DROP TABLE Owner_roles IF EXISTS;

CREATE TABLE Owner_roles (
    Owner_OWNER_ID BIGINT,
    roles VARCHAR(255),
    CONSTRAINT fk_owner_roles
        FOREIGN KEY (Owner_OWNER_ID) REFERENCES Owner (OWNER_ID)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);