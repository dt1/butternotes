(defproject muse "0.1.0-SNAPSHOT"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.10.0"]
                 [compojure "1.6.1"]
                 [ring/ring-defaults "0.3.2"]
                 [ring-cors "0.1.13"]
                 [org.clojure/data.json "1.0.0"]
                 [org.clojure/java.jdbc "0.7.11"]
                 [org.clojure/data.xml "0.0.8"]
                 [org.clojure/math.numeric-tower "0.0.4"]
                 [org.postgresql/postgresql "42.2.10.jre7"]
                 [com.layerware/hugsql "0.5.1"]
                 [hiccup "2.0.0-alpha2"]
		 [cc.qbits/alia-joda-time "4.3.3"]	
                 [environ "1.1.0"]
                 [buddy "2.0.0"]]
  
  :plugins [
            [lein-ring "0.12.5"]
            [lein-environ "1.1.0"]]
  ;; :hooks [environ.leiningen.hooks]
  :ring {:handler muse.handler/app}
  ;; :uberjar-name "muse.jar"
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.2"]]}}
  ;; {:production {:env {:production true}}}
  )
