select
  t.id as talent_id,
  t.role_id as current_role,
  r.name
from talents as t
join roles as r on r.id = t.role_id