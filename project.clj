(defproject muse "0.1.0-SNAPSHOT"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [compojure "1.5.1"]
                 [ring/ring-defaults "0.2.1"]
                 [cljs-ajax "0.5.8"]
                 [org.clojure/java.jdbc "0.7.0-alpha1"]
                 [org.postgresql/postgresql "9.4.1212"]
                 [com.layerware/hugsql "0.4.7"]
                 [hiccup "1.0.5"]
                 [cc.qbits/alia "2.2.3"]
                 [org.clojure/data.xml "0.0.8"]
                 [environ "1.1.0"]
                 [ring/ring-jetty-adapter "1.5.0"]
                 [org.clojure/math.numeric-tower "0.0.4"]
                 [cljs-ajax "0.5.8"]
                 [buddy "1.3.0"]]
  
  :plugins [
            [lein-ring "0.9.7"]
            [environ/environ.lein "0.3.1"]]
  ;; :hooks [environ.leiningen.hooks]
  :ring {:handler muse.handler/app}
  :uberjar-name "muse.jar"
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.0"]]}}
  ;; {:production {:env {:production true}}}
  )
