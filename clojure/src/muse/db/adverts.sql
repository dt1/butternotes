-- src/muse/db/adverts.sql

-- :name amz-imgtxt-ad :?
select ad_link
from advertising.amazon_ads
where ad_type = 'image-text'
order by random()
limit 1;

-- :name selword :1
select * from information_schema.columns limit 1;

-- :name sc :?
select * from public.try;
