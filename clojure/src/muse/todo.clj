(ns muse.todo)


;; unsure if I'll bring back the sortable notes
(def sortable "/js/sortable/sortable.js")

(def norder "
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

")

(def norder-css "/css/norder.css")


;; fix top-nav for various scales in vuejs.
(def major-links-vec
  ["c" "c-sharp"
   "d-flat" "d" "d-sharp"
   "e-flat" "e" "e-sharp"
   "f-flat" "f" "f-sharp"
   "g-flat" "g" "g-sharp"
   "a-flat" "a" "a-sharp"
   "b-flat" "b" "b-sharp"
   "c-flat"])

(def dim-links-vec
  ["c"
   "d-flat" "d"
   "e-flat" "e"
   "f" "f-sharp"
   "g-flat" "g"
   "a-flat" "a"
   "b-flat" "b"])
