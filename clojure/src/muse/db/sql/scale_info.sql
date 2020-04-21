-- src/muse/db/scale_info.sql

-- :name select-scale-info
select scale_type, scale_wh_pattern, scale_fsn_pattern
from scale_info.patterns
where scale_type = :scale_type;
