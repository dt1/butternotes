# How to run:

This system requires Clojure, Vue.js (NodeJs), and PostgresSQL.

### PostgreSQL

Create a new database and run the files found under /db-scripts.

`mv clojure/src/muse/db/conn_orig.clj clojure/src/muse/db/conn.clj`

Update the file with the appropriate credentials.

### Clojure

`$ cd clojure`

`$ lein ring server`

### Node / VueJs

` $ cd node`

`$ npm run serve`

The site will be available and `localhost:8080`