select 
  tc.talent_id,
  t.fullname,
  array_agg(c.name order by tc.sort_position asc)
from talent_capabilities as tc
join capabilities as c on c.id = tc.capability_id
join talents as t on t.id = tc.talent_id
group by 
  tc.talent_id, t.fullname