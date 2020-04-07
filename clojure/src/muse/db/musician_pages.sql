-- src/muse/db/musician_pages.sql

-- :name get-musician-id
select musician_id
from musician.info
where musician_id = :musician_id;

-- :name sdo-test
-- :doc doing some testing
select *
from do_test

-- :name musician-info :? :*
select *
from musician.info
order by musician_id;

-- :name explore-musician-links :? :*
select musician_id, musician_name, thumbnail_path, genre
from musician.info
order by added_date desc;

-- :name musician-page :? :*
select musician_name, genre, photo_path, review,
website, facebook, twitter,
patreon, instagram, amazon,
bandcamp, youtube, apple, youtube_video
from musician.info
join musician.reviews
using (musician_id)
join musician.links
using (musician_id)
where musician_id = :musician-id;

-- :name apple-links :? :*
select *
from musician.apple_links
where musician_id = :musician-id
order by apple_link_id;
