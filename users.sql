create database users;

create table users(
    id integer primary key auto_increment,
    nome varchar(100) not null,
    cognome varchar(100) not null,
    username varchar(16) not null unique,
    email varchar(319) not null unique,
    genere char not null,
    pwd varchar(128) not null check(char_length(pwd)>8),
    img varchar(255)
);


create table lista(
	id varchar(10) not null,
    user_id integer not null,
    index new_user_id(user_id),
    foreign key(user_id) references users(id) on update cascade,
    titolo text,
    tipo varchar(5),
    overview text,
    release_date varchar(10),
    img text,
    primary key(id, user_id)
);
