-- src/muse/db/users.sql

-- :name get-beta-email
select 1
from beta.betas
where email = :email;

-- :name insert-beta-user :!
insert into beta.betas (email, password)
values (:email, :pwd);

-- :name select-user-password
select password
from beta.betas
where email = :email;
