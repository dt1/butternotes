(ns muse.page.homepage
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]))

(defn home-page []
  {:homepage "reviving this site. Please feel free to try out the items to the 
left. Most of it is working again."})
