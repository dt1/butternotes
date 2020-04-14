(ns muse.page.lab_record_to_file
  (:require [compojure.core :refer :all]))

;; (defn lab-page [& arr]
;;    [:head 
;;     [:title "Butter Notes | Lab, recording"]
;;     [:meta {:description "Play Music and Generate Sheet Music (very beta)"}]
;;     (for [x (mhd/headers {:head-type "global"})]
;;       x)

;;     [:script {:src ""}]]

;;    [:div.row    
;;     [:h1 "Record and Download a Recording"]
;;     [:p "This lab uses " [:a {:href ""} "WebRTC"] ", which may or may not work in your browser. I've had the
;; best results using " [:a {:href "https://www.google.com/chrome/index.html"} "Chrome" "."]]
;;     [:p "Before you press \"start,\" make sure to either plug in headphones or turn the volume down to reduce feedback."]

;; ;    [:h2 "Options"]
;;     [:div
;;      [:label "Monitor Gain (volume of your listening device,
;; does not effect recording volume):"]
;;      [:input#monitorGain {:value "1", :type "number" :min "1"
;;                           :style "width: 10em;"}]]
;;     ;; [:div
;;     ;;  [:label "numberOfChannels"]
;;     ;;  [:input#numberOfChannels {:value "1", :type "number"}]]
;;     ;; [:div
;;     ;;  [:label "encoderSampleRate"]
;;     ;;  [:input#encoderSampleRate {:value "48000", :type "number"}]]
;;     ;; [:div
;;     ;;  [:label "bitRate"]
;;     ;;  [:input#bitRate {:value "64000", :type "number"}]]
;; ;;    [:h2 "Commands"]
;;     [:button#init.button "init"]
;;     [:button#start.button {:disabled "disabled"} "start"]
;;     [:button#pause.button {:disabled "disabled"} "pause"]
;;     [:button#resume.button {:disabled "disabled"} "resume"]
;;     [:button#stopButton.button {:disabled "disabled"} "stop"]
;;     [:h2 "Recordings"]
;;     [:ul#recordingslist]
;;     [:h5 "Log"]
;;     [:pre#log]
;;     [:script {:src ""}]
;;     ])

(def recorder "https://s3-us-west-1.amazonaws.com/butternotes/js/recorder/recorder.min.js")

(def web-rtc "https://webrtc.org/")

(def lab-recorder "/recorder/lab_record.js")
