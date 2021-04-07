-----Last updated Apr 7th - Adele --
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(225) NOT NULL,
  password VARCHAR(255) NOT NULL,

  creator_status BOOLEAN DEFAULT FALSE
);
