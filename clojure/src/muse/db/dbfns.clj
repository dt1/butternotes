(ns muse.db.dbfns
  (:require [hugsql.core :as hugsql]))

(hugsql/def-db-fns "muse/db/sql/scale_info.sql")
(hugsql/def-db-fns "muse/db/sql/adverts.sql")
(hugsql/def-db-fns "muse/db/sql/users.sql")
(hugsql/def-db-fns "muse/db/sql/articles.sql")
