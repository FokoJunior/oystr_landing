CREATE TABLE IF NOT EXISTS subscribers (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email      TEXT        UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers (email);
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_only" ON subscribers
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
