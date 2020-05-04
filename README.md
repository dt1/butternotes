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

### Asset files

#### Routing in the side nav

Most of the sidenav is hard-coded in Clojure, however, the "On Programming" and "Reviews" trees will not be populated.

In order for the sidenav to be complete, you would have to populate the appropriate tables with the routes.

#### HTML

All HTML is built by hand and loaded in the database.

#### IMG

The folder of images files include .svg and .png images. These are all hosted on my cdn.

### Licensing.

This software is released under the [Mozilla Public License Version 2.0](https://www.mozilla.org/en-US/MPL/2.0/)
