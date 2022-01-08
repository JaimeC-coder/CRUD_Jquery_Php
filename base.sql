drop database if exists sistemas;
create database sistemas;
use sistemas;
create table sistemas(
    id int(11) not null auto_increment,
    nombre varchar(255) not null,
    precio varchar(255) not null,
    primary key(id)
);

