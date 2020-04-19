create schema scale_info;

create table scale_info.patterns(
    scale_type varchar primary key,
    scale_wh_pattern varchar,
    scale_fsn_pattern varchar
);
