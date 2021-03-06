create table tb_genre (id  bigserial not null, name varchar(255), primary key (id));
create table tb_movie (id  bigserial not null, img_url varchar(255), sub_title varchar(255), synopsis TEXT, title varchar(255), year int4, genre_id int8, primary key (id));
create table tb_review (id  bigserial not null, text varchar(255), movie_id int8, user_id int8, primary key (id));
create table tb_role (id  bigserial not null, authority varchar(255), primary key (id));
create table tb_user (id  bigserial not null, email varchar(255), name varchar(255), password varchar(255), primary key (id));
create table tb_user_role (user_id int8 not null, role_id int8 not null, primary key (user_id, role_id));
alter table tb_movie add constraint FKsgjdq7d9ajnr85pl4am109qsh foreign key (genre_id) references tb_genre;
alter table tb_review add constraint FKmnmhbadmg8ugakn8q89rh5k3l foreign key (movie_id) references tb_movie;
alter table tb_review add constraint FKqeh83gbufxg1ft0ubwn7w0tty foreign key (user_id) references tb_user;
alter table tb_user_role add constraint FKea2ootw6b6bb0xt3ptl28bymv foreign key (role_id) references tb_role;
alter table tb_user_role add constraint FK7vn3h53d0tqdimm8cp45gc0kl foreign key (user_id) references tb_user;
