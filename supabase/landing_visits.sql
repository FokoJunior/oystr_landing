CREATE TABLE IF NOT EXISTS landing_visits (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  ip          TEXT,
  user_agent  TEXT,
  device_type TEXT,
  device      TEXT,
  browser     TEXT,
  os          TEXT,
  referrer    TEXT,
  path        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_landing_visits_created_at ON landing_visits (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_landing_visits_ip ON landing_visits (ip);
ALTER TABLE landing_visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_only" ON landing_visits
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
