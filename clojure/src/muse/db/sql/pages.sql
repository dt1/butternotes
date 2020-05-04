-- src/muse/db/pages.sql

-- :name select-page :? :1
select title, description, html
from page.pages
where page_type = :page-type;
