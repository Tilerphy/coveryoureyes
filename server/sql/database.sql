set collation_connection=utf8_general_ci;
set collation_database=utf8_general_ci;
set collation_server=utf8_general_ci;
create database coveryoureyes;
use coveryoureyes;
create table trophy(id varchar(64) primary key, gameid varchar(64), name varchar(128), trophypoint int);
create table game(id varchar(64) primary key, name varchar(128));
create table alluser(fedid varchar(256) primary key, nickname varchar(128), others text);
create table trophyrecord(id varchar(64) primary key,fedid varchar(256), recordcount int, needcount int, trophy varchar(64), createtime bigint, endtime 
bigint);
create table ranking(id varchar(64) primary key, fedid varchar(256), gameid varchar(64), highscore bigint, rank int, createtime bigint);
create index trophy_index on trophy(id, gameid);
create index alluser_index on alluser(fedid, nickname);
create index game_index on  game(id, name);
create index tr_index on trophyrecord(id, fedid, trophy);
create index ranking_index on ranking(fedid, id, gameid, rank);
