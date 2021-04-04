-----Last updated Apr 3rd - Adele --
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(225) NOT NULL,
  password VARCHAR(255) NOT NULL,

  creator_status BOOLEAN DEFAULT FALSE
);


DROP TABLE IF EXISTS stories CASCADE;
CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT Now(),
  publish_date TIMESTAMP DEFAULT Now(),

  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS contributions CASCADE;
CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  contributor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  likes INTEGER,

  content TEXT,
  created_at TIMESTAMP DEFAULT Now()
);

