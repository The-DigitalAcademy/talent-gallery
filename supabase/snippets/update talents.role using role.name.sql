update talents as t
set role = r.name
from roles as r
where t.role_id = r.id