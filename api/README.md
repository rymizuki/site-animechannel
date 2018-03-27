```sql
INSERT INTO user (
  passportId,
  createdAt,
  updatedAt
) VALUES (
  (SELECT id FROM passport WHERE username = 'mizuki_r'),
  NOW(),
  NOW()
);
```

```sql
INSERT INTO user_permission (
  userId,
  permissionId,
  enabled,
  createdAt,
  updatedAt
) VALUES (
  (SELECT id FROM user WHERE passportId = (SELECT id FROM passport WHERE username = 'mizuki_r')),
  1,
  true,
  NOW(),
  NOW()
);
```
