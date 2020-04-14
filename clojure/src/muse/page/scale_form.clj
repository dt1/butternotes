(ns muse.page.scale_form)

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
