-- src/muse/db/articles.sql

-- :name on-programming-menu :?
select title as name, '/on-programming/' || url as href
from article.programming
order by norder;

-- :name on-programming-article :? :1
select title, description, html
from article.programming
where url = :url
