(ns muse.db.dbfns
  (:require [hugsql.core :as hugsql]))

(hugsql/def-db-fns "muse/db/scale_info.sql")
(hugsql/def-db-fns "muse/db/blogs.sql")
(hugsql/def-db-fns "muse/db/adverts.sql")
(hugsql/def-db-fns "muse/db/users.sql")
