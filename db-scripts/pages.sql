create schema page;

create table page.pages (
       page_type varchar primary key,
       title varchar unique,
       description varchar,
       html varchar
);
