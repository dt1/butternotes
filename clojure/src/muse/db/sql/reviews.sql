-- src/muse/db/reviews.sql

-- :name plugin-menu :?
select title as name, '/reviews/plugins/' || url as href
from review.plugins
order by title;

-- :name plugin-review :? :1
select title, description, html
from review.plugins
where url = :url
