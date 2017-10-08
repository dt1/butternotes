-- src/muse/db/blogs.sql

-- :name get-blog-titles
select blog_id, blog_title
from blog.blogs
order by blog_date desc;

-- :name blog-content
select blog_id, blog_title, blog_content
from blog.blogs
where blog_id = :blog_id;
