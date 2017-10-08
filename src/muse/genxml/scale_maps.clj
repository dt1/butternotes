(ns muse.genxml.scale_maps)

(def scale-map
  {"major-scale"
   {["E" 1] [["E" 1] ["F" 2] ["G" 2]
             ["A" 1] ["B" 1] ["C" 2] ["D" 2] ["E" 1]]
    
    ["B" 1] [["B" 1] ["C" 2] ["D" 2] ["E" 1] ["F" 2]
             ["G" 2] ["A" 2] ["B" 1]]
    
    ["C" -1]  [["C" -1] ["D" -1] ["E" -1] ["F" -1] ["G" -1]
               ["A" -1] ["B" -1] ["C" -1]]
    
    ["F" -1]  [["F" -1] ["G" -1] ["A" -1] ["B" -2] ["C" -1]
               ["D" -1] ["E" -1] ["F" -1]]
    
    ["G" -1]  [["G" -1] ["A" -1] ["B" -2] ["C" -1] ["D" -1]
               ["E" -1] ["F" nil] ["G" -1]]}


   "augmented-scales"
    {["B" 1]
     [["B" 1 3] ["D" 1 4] ["D" 2 4] ["G" nil 4]
      ["G" 1 4]
      ["B" nil 4] ["B" 1 4]
      ["B" nil 4] ["G" 1 4] ["G" nil 4]
      ["D" 2 4] ["D" 1 4] ["B" 1 3]]}
   
   "major-hexatonic-scales"
   {["D" -1]
    [["C" -1 4] ["E" -1 4] ["F" nil 4]
     ["G" -1 4] ["A" -1 4] ["B" -1 4]
     ["D" -1 5]
     ["B" -1 4] ["A" -1 4] ["G" -1 4]
     ["F" nil 4] ["E" -1 4] ["D" -1 4]]
    
    ["D" 1]
    [["C" 1 4] ["E" 1 4] ["F" 2 4] ["G" 1 4]
     ["A" 1 4] ["B" 1 4] ["D" 1 5]
     ["B" 1 4] ["A" 1 4] ["G" 1 4] ["F" 2 4]
     ["E" 1 4] ["D" 1 4]]}

   "two-semitone-tritone-scales"
   {["D" -1]
    [["D" -1 4] ["E" -2 4]
     ["E" -1 4] ["G" nil 4]
     ["A" -1 4] ["B" -2 4]
     ["D" -1 5]
     ["B" -2 4] ["A" -1 4]
     ["G" nil 4] ["E" -1 4]
     ["E" -2 4] ["D" -1 4]]

    ["D" nil]
    [["D" nil 4] ["E" -1 4]
     ["E" nil 4] ["G" 1 4]
     ["A" nil 4] ["B" -1 4]
     ["D" nil 5]
     ["B" -1 4] ["A" nil 4] ["G" 1 4]
     ["E" nil 4] ["E" -1 4]
     ["D" nil 4]]

    ["D" 1]
    [["D" 1 4] ["E" nil 4] ["E" 1 4]
     ["G" 2 4] ["A" 1 4] ["B" nil 4]
     ["D" 1 5]
     ["B" nil 4] ["A" 1 4] ["G" 2 4]
     ["E" 1 4] ["E" nil 4]
     ["D" 1 4]]}

   "whole-tone-scales"
   {["D" -1]
    [["D" -1 4] ["E" -1 4] ["F" nil 4]
     ["G" nil 4] ["A" nil 4]
     ["B" nil 4] ["D" -1 5]
     ["B" nil 4] ["A" nil 4] ["G" nil 4]
     ["F" nil 4] ["E" -1 4] ["D" -1 4]]

    ["D" nil]
    [["D" nil 4] ["E" nil 4] ["F" 1 4]
     ["G" 1 4] ["A" 1 4] ["B" 1 4]
     ["D" nil 5]
     ["B" 1 4] ["A" 1 4] ["G" 1 4] ["F" 1 4]
     ["E" nil 4] ["D" nil 4]]

    ["D" 1]
    [["D" 1 4] ["E" 1 4] ["F" 2 4] ["G" 2 4]
     ["A" 2 4] ["B" 2 4] ["D" 1 5]
     ["B" 2 4] ["A" 2 4] ["G" 2 4] ["F" 2 4]
     ["E" 1 4] ["D" 1 4]]

    ["B" 1]
    [["B" 1 3] ["C" 2 4] ["D" 2 4] ["E" 2 4]
     ["G" 1 4] ["A" 1 4] ["B" 1 4]
     ["A" 1 4] ["G" 1 4] ["E" 2 4] ["D" 2 4]
     ["C" 2 4] ["B" 1 3]]}

   "dim-scale"
   {"dfab"
    [["D" nil] ["E" nil] ["F" nil] ["G" nil]
     ["A" -1] ["B" nil] ["B" -1] ["C" 1] ["D" nil]]
    
    "efac"
    [["E" -1] ["F" nil] ["F" 1] ["G" 1]
     ["A" nil] ["B" nil] ["C" nil] ["D" nil] ["E" -1]]
    
    "g-flat"
    [["G" -1] ["G" 1] ["A" nil] ["B" nil]
     ["C" nil] ["D" nil] ["E" -1] ["F" nil] ["G" -1]]
    
    "degb"
    [["D" -1] ["E" -1] ["E" nil] ["F" 1]
     ["G" nil] ["A" nil] ["B" -1] ["C" nil] ["D" -1]]}})
