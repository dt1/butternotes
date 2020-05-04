create schema usr;

create table usr.tokens (
       user_name varchar primary key,
       token varchar unique
);
