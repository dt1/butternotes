-- src/muse/db/adverts.sql

-- :name get-one-image-ad
select ad_link, ad_image
from advertising.one_image_ad;

-- :name get-one-amazon-ad
select musician_name, amazon_link
from advertising.one_amazon_ad;

-- :name get-one-apple-ad
select musician_name, apple_affiliate_link
from advertising.one_apple_ad;
