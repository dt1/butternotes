(ns muse.page.newsletter
  (:require [compojure.core :refer :all]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [muse.page.page :as pg]
            [muse.page.head :as mhd]))

(defn sign-up []
  (pg/html-wrapper

   [:head 
    [:title "Butter Notes | Newsletter"]
    [:meta {:description "Information About Butter Notes"}]
    (for [x (mhd/headers {:head-type "global"})]
      x)]
   
   [:div#formContainer
    [:div#formBox
     [:form#signupSubscriberForm
      {:accept-charset "utf-8",
       :action
       "https://dbtoomey.campayn.com/contacts/signup_form_add_contact/55425",
       :method "post"}
      [:input {:type "hidden", :value "55332", :name "formId"}]
      [:div.formContainer.ui-sortable
       [:div.rowBlock.signupForNewsletter
        {:style "width: 480px;"}
        [:h1.richtext {:style "font-size:2em;"}
         "Newsletter"]
        [:div.description.richtext
         [:p "Signup for the newsletter to learn about new features and the latest updates."]
         [:p "The newsletter covers music, programming, and some website business thoughts. A bit free-form and a bit bloggy."]]]
       [:div.rowBlock.emailAddress
        {:style "width: 180px;"}
        [:div.fieldDesc
         {:style "color: rgb(0, 0, 0);"}
         "Email address"
         [:div.required {:style "color: inherit;"} "*"]]
        [:input#emailAddress
         {:type "text",
          :style "width: 167px;",
          :placeholder "Email address",
          :name "email",
          :value ""}]]]
      [:input#subscribeToList
       {:type "submit",
        :style
        "background-color: rgb(39, 4, 196); color: rgb(255, 255, 255);",
        :value "Subscribe"}]
      [:br]
      [:a.cmpLnk
       {:style "color: rgb(39, 4, 196);", :href "https://campayn.com"}
       "campayn"]
      [:div.clearBothDiv {:style "clear:both;"}]
      " \n"]]
    [:p "Did you want to send me (David) an email? "
     [:a {:href "mailto:david.t@butternotes..com"} "david.t@butternotes.com"]]]))
