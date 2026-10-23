update talents as t
set location = concat(l.city, ', ', l.country)
from locations as l
where t.location_id = l.id