# Butternotes

https://butternotes.com

## How to run:

This system requires Clojure, Vue.js, NodeJs, npm, and PostgresSQL.

The system assumes you are using the latest and greatest of each program.

### PostgreSQL

Create a new database and run the files found under /db-scripts.

`mv clojure/src/muse/db/conn_orig.clj clojure/src/muse/db/conn.clj`

Update `conn.clj` with the appropriate credentials.

### Clojure

`$ cd clojure`

`$ lein ring server`

This piece will be available at `localhost:3000`

### Node / VueJs

`$ cd node`

`$ npm install`

`$ npm run serve`

The site will be available and `localhost:8080`

### Routing and HTML

In order to populate the sidenav and routes, you need to add the html files to the appropriate database tables.

### SVG

There is a folder of .svg file in the root directory. These are all hosted on a cdn, which you are welcome to use.

### Licensing.

This software is released under the [Mozilla Public License Version 2.0](https://www.mozilla.org/en-US/MPL/2.0/)
