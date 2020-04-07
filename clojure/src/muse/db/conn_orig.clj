(ns muse.db.conn
  (:require [hugsql.core :as hugsql]))

(def db
  {:classname "org.postgresql.Driver"
   :subprotocol "postgresql"
   :subname "FILL IN"
   :user "FILL IN"
   :password "FILL IN"
   :sslmode "require"
   })

(hugsql/def-db-fns "muse/db/musician_pages.sql")
(hugsql/def-db-fns "muse/db/scale_info.sql")
(hugsql/def-db-fns "muse/db/blogs.sql")
(hugsql/def-db-fns "muse/db/adverts.sql")
(hugsql/def-db-fns "muse/db/users.sql")

; (hugsql/def-sqlvec-fns "muse/db/zab.sql")
