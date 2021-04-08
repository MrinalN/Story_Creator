-----Last updated Apr 7th - Adele --

DROP TABLE IF EXISTS contributions CASCADE;
CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  contributor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content TEXT,
  created_at TIMESTAMP DEFAULT Now()
);
