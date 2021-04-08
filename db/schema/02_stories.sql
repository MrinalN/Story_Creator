-----Last updated Apr 7th - Adele --

DROP TABLE IF EXISTS stories CASCADE;
CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT Now(),
  publish_date TIMESTAMP DEFAULT Now(),

  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
