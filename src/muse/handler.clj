(ns muse.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [compojure.handler :refer [site]]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.util.response :as resp]

            [muse.page.page :as pg]
            [muse.genxml.genxml :as gxml]
            [muse.genxml.notevector :as nvr]
            [muse.genxml.soundvector :as svr]
            [clojure.data.xml :refer :all]
            [ring.adapter.jetty :as jetty]
            [environ.core :refer [env]]
            [buddy.hashers :as hash]

            [muse.page.homepage :as hmp]
            [muse.page.about :as abt]
            [muse.page.newsletter :as nsr]
            [muse.page.four_oh_four :as fof]
            [muse.page.advertise :as adv]
            [muse.page.blog_page :as bpg]
            [muse.page.blog_listing :as blist]
            [muse.page.musician_review_page :as mrp]
            [muse.page.explore_music_page :as emp]
            [muse.page.music_main_page :as mmp]
            [muse.page.my_music :as mym]
            [muse.page.chord_page :as cpg]
            [muse.page.rsmg_form :as rsmg]
            [muse.page.rsmg_result :as rsmgr]
            [muse.page.lab :as lab]
            [muse.page.lab_gen_sheet_music :as lab-gsm]
            [muse.page.lab_record_to_file :as lab-rtf]
            [muse.page.metronome :as mtn]
            [muse.page.help_wanted :as help]
            [muse.page.beta_signup :as pbs]
            [muse.page.login :as plg]

            [muse.valid_xn_map :as vxm]

            [muse.db.conn :as sql]

            [muse.gdefs.gdefs :as gdefs])
  (:gen-class))

(def converter-map {"natural-scales" "natural-minor-scales"
                    "harmonic-scales" "harmonic-minor-scales"
                    "melodic-scales" "melodic-minor-scales"})

(defn minor-converter-map [x]
  (let [xc (converter-map x)]
    (if xc
      xc
      x)))

(defn major-scale-page [scale-name m]
  (let [notes (nvr/get-notes scale-name)
        scale-vector (gxml/scale-vector notes "major-scale")]
    (pg/scale-page
     scale-name
     (gxml/diatonic-links scale-vector)
     (svr/scale-sound-vector scale-vector)
     m
     "major-scales"
     (emit-str (gxml/gen-sheet-music scale-vector scale-name m)))))

(defn chromatic-scale-page [scale-name m]
  (let [notes (nvr/get-notes scale-name)
        scale-vector (gxml/scale-vector notes "chromatic-scale")]
    (pg/scale-page
     scale-name
     ""
     (svr/scale-sound-vector scale-vector)
     m
     "chromatic-scales"
     (emit-str (gxml/gen-sheet-music scale-vector scale-name m)))))

(defn minor-scale-page [scale-name note m]
  (let [notes (nvr/get-notes note)
        scale-vector (gxml/scale-vector notes scale-name)]
    (pg/scale-page
     scale-name
     ""
     (svr/scale-sound-vector scale-vector)
     m
     scale-name
     (emit-str (gxml/gen-sheet-music scale-vector note m)))))

(defn chord-page [chord-type chord-name m]
  (let [notes (nvr/get-notes chord-name)
        chord-vector (gxml/chord-vector notes)]
    (cpg/chord-page
     chord-type
     chord-name
     m
     (emit-str
      (gxml/gen-sheet-music chord-vector chord-name m)))))

(defn x1-page [x1]
  (cond (= x1 "major-scales")
        (pg/major-scale-nav-page gdefs/valid-scale-notes)

        (= x1 "random-sheet-music-generator")
        (rsmg/rsmg)

        :else
        (pg/major-scale-nav-page gdefs/valid-scale-notes)))

(defn home-page []
  (hmp/home-page))

(defn build-scales [s]
  (for [note gdefs/valid-scale-notes]
    (apply str note "-" s)))

(defn valid-major-scale? [scale]
  (some #(= scale %) (build-scales "major-scale")))

(defn valid-chromatic-scale? [scale]
  (some #(= scale %) (build-scales "chromatic-scale")))

(defroutes major-scale-routes
  (GET "/:scale" [scale & m]
       (if (valid-major-scale? scale)
         (major-scale-page scale m))))

(defroutes chromatic-scale-routes
  (GET "/:scale" [scale & m]
       (if (valid-chromatic-scale? scale)
         (chromatic-scale-page scale m))))

(defroutes musician-page
  (GET "/:musician-id" [musician-id]
       (if (not
            (empty?
             (sql/get-musician-id sql/db {:musician_id musician-id})))
         (mrp/musician-review-page musician-id))))

(defroutes blog-page
  (GET "/:blog-id" [blog-id]
       (if (not
            (empty?
             (sql/blog-content sql/db {:blog_id blog-id})))
         (bpg/blog-page blog-id))))

(defn valid-x1-route? [x1]
  (if (contains? vxm/valid-xn-map x1)
    (x1-page x1)))

(defn valid-x2-route? [x1 x2]
  (if (and (contains? vxm/valid-xn-map x1)
           (some #(= x2 %) (vxm/valid-xn-map x1)))
    (x1-page x1)))

(defn valid-x3-route? [x1 x2 x3 m]
  (let [x2-conv (minor-converter-map x2)]
    (if (and (contains? vxm/valid-xn-map x1)
             (some #(= x2 %) (vxm/valid-xn-map x1))
             (some #(= x3 %) (build-scales
                              (apply str (drop-last x2-conv)))))
      (if (.contains x1 "chords")
        (chord-page x2-conv x3 m)
        (minor-scale-page x2-conv x3 m)))))

(defn beta-signup [m]
  (let [minfo (sql/get-beta-email sql/db {:email (m "email")})]
          
          (cond (not= (m "pwd")
                      (m "pwd2"))
                (pbs/beta_su_page "passwords do not match")

                (not (empty? minfo))
                (pbs/beta_su_page "email already exists")

                (empty? minfo)
                (do (sql/insert-beta-user sql/db {:email (m "email")
                                                  :pwd (hash/encrypt
                                                        (m "pwd"))})
                    (pbs/beta_su_page "user valid"))
                
                :else
                (pbs/beta_su_page minfo))))

(defn login [m]
  (let [hpwd (sql/select-user-password sql/db {:email (m "email")})]
    (if (hash/check (m "pwd") ((first hpwd) :password))
      "true"
      "false")))

(defroutes app-routes
  (GET "/" [] (home-page))
  (GET "/:x1" [x1]
       (valid-x1-route? x1))

  (GET "/:x1/:x2" [x1 x2]
       (valid-x2-route? x1 x2))


  (GET "/:x1/:x2/:x3" [x1 x2 x3 & m]
       (valid-x3-route? x1 x2 x3 m))

  (context "/major-scales" [] major-scale-routes)
  (context "/chromatic-scales" [] chromatic-scale-routes)

  (GET "/blog" [] (blist/blog-list-page))
  (context "/blog" []  blog-page)

  (POST "/random-sheet-music-generator-result" {m :form-params}
        (let [rsmg-vec (gxml/init-rsmg m)
              random-xml (gxml/gen-random-sheet-music rsmg-vec m)
              sound-vec (svr/scale-sound-vector rsmg-vec)]
          (rsmgr/random-music-generator-result
           (emit-str random-xml)
           sound-vec)))

  (GET "/newsletter" [] (nsr/sign-up))
  (GET "/about" [] (abt/about))

  (GET "/lab" [] (lab/lab-page))
  
  (GET "/lab/generate-sheet-music" [] (lab-gsm/lab-page))
  (POST "/lab/generate-sheet-music" {m :form-params}
        (lab-gsm/lab-page m))

  (GET "/lab/record-to-file" [] (lab-rtf/lab-page))
  (POST "/lab/record-to-file" {m :form-params}
        (lab-rtf/lab-page m))

  (GET "/metronome" [] (mtn/metronome-page))

  (GET "/music" [] (mmp/music-main-page))
  (GET "/music/my-music" [] (mym/my-music-page))
  (GET "/music/explore" [] (emp/explore-musician-page))
  (context "/music/explore" [] musician-page)

  (GET "/advertise" [] (adv/advertise))

  (GET "/help-wanted" [] (help/help-wanted))

  (GET "/private-beta-signup" []
       (pbs/beta_su_page))
  (POST "/private-beta-signup" {m :form-params}
        (beta-signup m))

  (GET "/login" []
       (plg/login-page))
  
  (POST "/login" {m :form-params}
        (login m))

  (GET "/xml/sitemap" []
       (resp/redirect "https://s3-us-west-1.amazonaws.com/butternotes/xml/sitemap.xml"))

  (route/not-found (fof/four-oh-four)))

(def app
  (wrap-defaults app-routes site-defaults))

(defn -main [& [port]]
  (let [port (Integer. (or port (env :port) 5000))]
    (jetty/run-jetty (site #'app) {:port port :join? false})))
