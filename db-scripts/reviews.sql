create schema review;

create table review.hardware (
       url varchar primary key,
       title varchar unique,
       description varchar,
       html varchar,
       norder int
);

create table review.plugins (
       url varchar primary key,
       title varchar unique,
       description varchar,
       html varchar,
       norder int
);

create table review.gear (
       url varchar primary key,
       title varchar unique,
       description varchar,
       html varchar,
       norder int
);

create table review.instruments (
       url varchar primary key,
       title varchar unique,
       description varchar,
       html varchar,
       norder int
);
