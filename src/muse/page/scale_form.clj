(ns muse.page.scale_form
  (:require [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.clefs :as clf])) 

(def key-sig-map {"No Sharps:"
                  [["0" "C / Am"]]

                  "Sharps:"
                  [["1" "G / Em"]
                   ["2" "D / Bm"]
                   ["3" "A / F&#9839;m"]
                   ["4" "E / C&#9839;m"]
                   ["5" "B / G&#9839;m"]
                   ["6" "F&#9839; / D&#9839;m"]
                   ["7" "C&#9839;"]]

                  "Flats:"
                  [["-1" "F / Dm"]
                   ["-2" "B&#9837; / Gm"]
                   ["-3" "E&#9837; / Cm"]
                   ["-4" "A&#9837; / Fm"]
                   ["-5" "D&#9837; / B&#9837;m"]
                   ["-6" "G&#9837; / E&#9837;m"]
                   ["-7" "C&#9837;"]]})

(defn create-radio-clef-group [&m]
  [:div.medium-12.columns
   [:p [:b "Use this form to make changes to the notation."]]
   [:p [:b  "You can change 1 item, all the items, anything in between."]]
   [:p "Change the Clef:"]
   (for [i clf/clef-radio-list]
     (cond (= (:clef &m) (i 0))
           [:input {:type "radio" :name "clef"
                    :style "margin-left: 20px;" :value (i 0)
                    :checked "checked"}
            [:img {:src (i 1)}]]
           
           (and (not (:clef &m))
                (= (i 0) "G1"))
           [:input {:type "radio" :name "clef"
                    :style "margin-left: 20px;" :value (i 0)
                    :checked "checked"}
            [:img {:src (i 1)}]]
           
           :else
           [:input {:type "radio" :name "clef"
                    :style "margin-left: 20px;" :value (i 0)}
            [:img {:src (i 1)}]]))])

(defn create-key-sig-group [&m]
  [:select {:name "key-sig"}
   (for [[k v] key-sig-map]
     [:optgroup {:label k}
      (for [vv v]
        (cond (= (vv 0) (:key-sig &m))
              [:option {:value (vv 0)
                        :selected "selected"} (vv 1)]

              (and (not (:key-sig &m))
                   (= (vv 0) "0"))
              [:option {:value (vv 0)
                        :selected "selected"} (vv 1)]

              :else
              [:option {:value (vv 0)} (vv 1)]))])])

(defmulti norder-list
  (fn [x]
    (:stype x)))

(defmethod norder-list "octonic" [x]
  {\0 [:li.norder-c1.hand-hover {:data-id "0"} "tonic (0)"]
   \1 [:li.norder-c2.hand-hover {:data-id "1"} "1"]
   \2 [:li.norder-c3.hand-hover {:data-id "2"} "3"]
   \3 [:li.norder-c4.hand-hover {:data-id "3"} "4"]
   \4 [:li.norder-c5.hand-hover {:data-id "4"} "6"]
   \5 [:li.norder-c6.hand-hover {:data-id "5"} "7"]
   \6 [:li.norder-c7.hand-hover {:data-id "6"} "9"]
   \7 [:li.norder-c8.hand-hover {:data-id "7"} "t"]
   \8 [:li.norder-c8.hand-hover {:data-id "8"} "octave (0)"]}) 

;; (defmethod norder-list "diminished-scales" [x]
;;   (norder-list {:stype "octonic"}))

(defmethod norder-list "hepatonic" [x]
  {\0 [:li.norder-c1.hand-hover {:data-id "0"} "tonic (1)"]
   \1 [:li.norder-c2.hand-hover {:data-id "1"} "supertonic (2)"]
   \2 [:li.norder-c3.hand-hover {:data-id "2"} "mediant (3)"]
   \3 [:li.norder-c4.hand-hover {:data-id "3"} "subdominant (4)"]
   \4 [:li.norder-c5.hand-hover {:data-id "4"} "dominant (5)"]
   \5 [:li.norder-c6.hand-hover {:data-id "5"} "submediant (6)"]
   \6 [:li.norder-c7.hand-hover {:data-id "6"} "leading tone (7)"]
   \7 [:li.norder-c8.hand-hover {:data-id "7"} "octave (8)"]})

(defmethod norder-list "pentatonic" [x]
  {\0 [:li.norder-c1.hand-hover {:data-id "0"} "root1 (1)"]
   \1 [:li.norder-c2.hand-hover {:data-id "1"} "2 (2)"]
   \2 [:li.norder-c3.hand-hover {:data-id "2"} "3 (3)"]
   \3 [:li.norder-c4.hand-hover {:data-id "3"} "5 (4)"]
   \4 [:li.norder-c5.hand-hover {:data-id "4"} "5 (5)"]
   \5 [:li.norder-c6.hand-hover {:data-id "5"} "root2 (6)"]})

(defmethod norder-list "hexatonic" [x]
  {\0 [:li.norder-c1.hand-hover {:data-id "0"} "tonic (1)"]
   \1 [:li.norder-c2.hand-hover {:data-id "1"} "2 (2)"]
   \2 [:li.norder-c3.hand-hover {:data-id "2"} "3 (3)"]
   \3 [:li.norder-c4.hand-hover {:data-id "3"} "4 (4)"]
   \4 [:li.norder-c5.hand-hover {:data-id "4"} "5 (5)"]
   \5 [:li.norder-c6.hand-hover {:data-id "5"} "6 (6)"]
   \6 [:li.norder-c8.hand-hover {:data-id "7"} "tonic2 (8)"]})

(defmethod norder-list "chromatic" [x]
  {\a [:li.norder-c1.hand-hover {:data-id "0"} "tonic (1)"]
   \b [:li.norder-c2.hand-hover {:data-id "1"} "2 (2)"]
   \0 [:li.norder-c3.hand-hover {:data-id "2"} "3 (3)"]
   \1 [:li.norder-c4.hand-hover {:data-id "3"} "4 (4)"]
   \2 [:li.norder-c5.hand-hover {:data-id "4"} "5 (5)"]
   \3 [:li.norder-c6.hand-hover {:data-id "5"} "6 (6)"]
   \4 [:li.norder-c2.hand-hover {:data-id "6"} "7 (7)"]
   \5 [:li.norder-c3.hand-hover {:data-id "7"} "8 (8)"]
   \6 [:li.norder-c4.hand-hover {:data-id "8"} "9 (9)"]
   \7 [:li.norder-c5.hand-hover {:data-id "9"} "10 (10)"]
   \8 [:li.norder-c6.hand-hover {:data-id "10"} "11 (11)"]
   \9 [:li.norder-c8.hand-hover {:data-id "11"} "tonic2 (12)"]})


(defn dispatch-norder-list [x]
  (cond (some #(= x %) ["diminished-scales"])
        (norder-list {:stype "octonic"})

        (some #(= x %) ["major-scales" "natural-minor-scales"
                        "harmonic-minor-scales" "melodic-minor-scales"
                        "ionian-scales" "dorian-scales"
                        "phrygian-scales" "lydian-scales"
                        "mixolydian-scales" "aeolian-scales"
                        "locrian-scales"
                        "ionian-modes" "dorian-modes"
                        "phrygian-modes" "lydian-modes"
                        "mixolydian-modes" "aeolian-modes"
                        "locrian-modes"])
        (norder-list {:stype "hepatonic"})

        (some #(= x %) ["minor-pentatonic-scales"
                        "major-pentatonic-scales"])
        (norder-list {:stype "pentatonic"})

        (some #(= x %) ["augmented-scales" "blues-scales"
                        "major-hexatonic-scales" "minor-hexatonic-scales"
                        "prometheus-scales" "tritone-scales"
                        "two-semitone-tritone-scales"
                        "whole-tone-scales"])
        (norder-list {:stype "hexatonic"})

        (= x "chromatic-scales")
        (norder-list {:stype "chromatic"})))

(defn scale-form [m scale-type]
  [:div.medium-12.columns
   [:ul.accordion {:data-accordion "data-accordion"
                   :data-allow-all-closed "true"}
    [:li.accordion-item
     [:a.accordion-title
      {:href "#collapse1"
       :role "tab"
       :id "collapse1-heading"
       :style "border-color: black"}"Show Scale Alteration Form"]
     [:div.accordion-content
      {:role "tabpanel"
       :data-tab-content "data-tab-content"
       :aria-labelledby "panel1d-heading"}
      [:form
       {:method "GET" :id "ff"}
       [:div.row
        (create-radio-clef-group m)]
       [:div.row
        [:div.medium-6.columns
         [:p "Change the Octave: (raise or lower note pitches)"]
         (if (:octave m)
           [:input {:type "number" :min "1" :max "8" :step "1"
                    :style "width: 100px;" :name "octave"
                    :value (:octave m)}]
           [:input {:type "number" :min "1" :max "8" :step "1"
                    :style "width: 100px;" :name "octave"
                    :value "4"}])]]
       [:br]
       [:div.row
        [:div.medium-4.columns
         [:p "Change the Key Signature:"]
         (create-key-sig-group m)]]
       [:br]
       [:div.row
        [:div.medium-12.columns
         [:p "Change the Note Placement (drag and drop to reorder):"]

         (let [nlist (dispatch-norder-list scale-type)]
           [:ul#norder.menu
            (cond (and (:norder m)
                       (not (empty? (:norder m))))
                  (for [k (:norder m)]
                    (nlist k))

                  :else
                  (for [k (keys nlist)]
                    (nlist k)))])
         ]]
       [:input {:type "hidden" :name "norder" :id "n-sort-order"
                :value (:norder m)}]
       [:br]
       [:div.row
        [:div.medium-12.columns
         [:input.button {:type "submit" :value "Submit"}]]]]
      ]]]
   [:script "
Sortable.create(norder, {
  group: 'norder',
  animation: 100,
  store: {
        /**
         * Get the order of elements. Called once during initialization.
         * @param   {Sortable}  sortable
         * @returns {Array}
         */
        get: function (sortable) {
            var order = localStorage.getItem(sortable.options.group.name);
            return order ? order.split('|') : [];
        },

        /**
         * Save the order of elements. Called onEnd (when the item is dropped).
         * @param {Sortable}  sortable
         */
        set: function (sortable) {
            ff = document.forms['ff'];
            var order = sortable.toArray();
            ff.elements['n-sort-order'].value = order;
        }
    }
});

"]])
                                        ;]]]])
