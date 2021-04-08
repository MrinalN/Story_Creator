-----Last updated Apr 7th - Adele --

DROP TABLE IF EXISTS likes_table CASCADE;
CREATE TABLE likes_table (
  id SERIAL PRIMARY KEY NOT NULL,
  contribution_id INTEGER REFERENCES contributions(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
)
