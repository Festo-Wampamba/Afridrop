-- Role migration: attendant → technician
-- Run this once against the production database after deploying the
-- feature/role-dashboards branch. It is safe to run on an already-migrated
-- database (WHERE clause silently matches zero rows).
--
--   psql $DATABASE_URL -f scripts/migrate-roles.sql
--
UPDATE users SET role = 'technician' WHERE role = 'attendant';
