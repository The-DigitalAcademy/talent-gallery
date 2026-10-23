update talents as t
SET capabilities = subquery.capability_list
from (
  select 
    tc.talent_id,
    ARRAY_AGG(distinct c.name order by c.name asc) as capability_list
  from talent_capabilities as tc
  join capabilities as c on c.id = tc.capability_id
  group by tc.talent_id
) as subquery
where t.id = subquery.talent_id;
