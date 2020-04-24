create schema article;

create table article.programming (
       url varchar primary key,
       title varchar unique,
       description varchar,
       html varchar,
       norder int
);
