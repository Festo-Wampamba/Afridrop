-- Technician reports table
-- Apply manually: psql $DATABASE_URL -f drizzle/manual/0001_technician_reports.sql

CREATE TABLE IF NOT EXISTS technician_reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  technician_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  job_id          UUID REFERENCES quotations(id) ON DELETE SET NULL,
  title           VARCHAR(150) NOT NULL,
  content         TEXT NOT NULL,
  undone_items    TEXT,
  status          VARCHAR(20) NOT NULL DEFAULT 'draft',
  submitted_at    TIMESTAMPTZ,
  reviewed_by     UUID REFERENCES users(id) ON DELETE SET NULL,
  reviewed_at     TIMESTAMPTZ,
  review_note     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
