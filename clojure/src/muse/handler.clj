(ns muse.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [compojure.handler :refer [site]]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.util.response :as resp]
            [ring.middleware.cors :as cors]

            [muse.page.page :as pg]
            [muse.genxml.genxml :as gxml]
            [muse.genxml.notevector :as nvr]
            [muse.genxml.soundvector :as svr]
            [clojure.data.xml :refer :all]
            [environ.core :refer [env]]
            [buddy.hashers :as hash]
            [clojure.data.json :as json]

            [muse.page.homepage :as hmp]
            [muse.layout.sidenav :as sidenav]
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
    (emit-str (gxml/gen-sheet-music scale-vector scale-name m))))

(defn chromatic-scale-page [scale-name m]
  (let [notes (nvr/get-notes scale-name)
        scale-vector (gxml/scale-vector notes "chromatic-scale")]
    (emit-str (gxml/gen-sheet-music scale-vector scale-name m))))

(defn minor-scale-page [scale-name note m]
  (let [notes (nvr/get-notes note)
        scale-vector (gxml/scale-vector notes scale-name)]
    (emit-str (gxml/gen-sheet-music scale-vector note m))))

(defn chord-page [chord-type chord-name m]
  (let [notes (nvr/get-notes chord-name)
        chord-vector (gxml/chord-vector notes)]
    (emit-str (gxml/gen-sheet-music chord-vector chord-name m))))

(defn x1-page [x1]
  (cond (= x1 "major-scales")
        (pg/major-scale-nav-page gdefs/valid-scale-notes)

        (= x1 "random-sheet-music-generator")
        (rsmg/rsmg)

        :else
        (pg/major-scale-nav-page gdefs/valid-scale-notes)))

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

(defroutes app-routes
  (GET "/" []
       (json/write-str (hmp/home-page)))

  (GET "/sidenav" []
       (json/write-str (sidenav/side-nav)))

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

  (GET "/xml/sitemap" []
       (resp/redirect "https://s3-us-west-1.amazonaws.com/butternotes/xml/sitemap.xml"))

  (route/not-found (fof/four-oh-four)))

(def app
  (-> (wrap-defaults app-routes site-defaults)
      (cors/wrap-cors :access-control-allow-origin [#".*"]
                      :access-control-allow-methods [:get :put :post :delete])))

;; (def app
;;   (wrap-defaults app-routes site-defaults))
