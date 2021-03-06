create schema advertising;

create table advertising.ad_type_check (
       ad_type varchar primary key
);

create table advertising.amazon_ads (
       ad_link varchar primary key,
       ad_type varchar,
       foreign key (ad_type) references advertising.ad_type_check(ad_type)
);

insert into advertising.ad_type_check
values ('text'), ('image-text');
