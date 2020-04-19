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
