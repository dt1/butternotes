(ns muse.page.homepage
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]))

(defn home-page []
  (pg/html-wrapper

   [:head mhd/item-scope
    [:title "Butter Notes | Home"]
    [:meta {:description "Explore and practice music theory"}]
    (for [x (mhd/headers {:head-type "global"})]
      x)]

   [:div
    [:div.row 
     [:p "Butternotes.com is under daily updates. The most recent
feature is MusicXML exports for all scales, modes, and chords."]
     [:p "Check out the musician mini-reviews under the Music tab for inspiration."]
     [:p "Sign up for the " [:a {:href "/newsletter"} "newsletter"] " for
a (usually) weekly rundown of the newest updates, upcoming features, and generally bloggy-ness."]
     [:h3 "What are butter notes?"]
     [:p "I'll let Herbie Hancock explain it:"]
     [:div#test-div
      [:video
       {:controls "controls"}
       [:source
        {:type "video/ogv", :src "https://s3-us-west-1.amazonaws.com/butternotes/video/dont-play-butter-notes.ogv"}]
       [:source
        {:type "video/mp4", :src "https://s3-us-west-1.amazonaws.com/butternotes/video/dont-play-butter-notes.mp4"}
        "\n  Your browser does not support the "
        [:code "video"]
        " element.\n"]]]]
    [:div.row
     [:p]
     [:p "That may be confusing, so let me add to that:"]
     [:p "Suppose you are in a band, and the rhythm is playing the
C major chord. If you are playing leads, you may want to pick from
the notes from the C major scale:"]
     [:p "CDEFGAB"]
     [:p "The root is C, the 2nd is D, the 3rd is E, and so on and
so forth. Hancock is saying to NOT play the 3rd and the 7th, because
they are obvious, so, in the example of playing with the C major scale,
you would not be playing the E or the B."]
     [:p "All art is based on limitations, and with limitations,
genius solutions arise. So many songs are 3 to 4 minutes. Most songs
stay in a single key and maintain a constant time signature. These are
guide points, but they can be a way to constrict and limit, in a good
way, what you are able to do with a song. The restriction on playing
the 3rd and the 7th force you to come with new perspectives and approaches."]
     [:p "In an apparent twist of irony, butternotes.com does, in fact, 
show all the butter notes -- one can't not play them if he or she 
doesn't know what they are."]]]))
