select 
  t.id as talent_id,
  t.location_id as current_location,
  concat(l.city, ', ', l.country) as location
from talents as t
join locations as l on l.id = t.location_id