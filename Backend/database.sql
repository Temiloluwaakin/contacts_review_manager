CREATE DATABASE ContactManager;

CREATE TABLE contact(
  contact_id SERIAL PRIMARY KEY,
  first_name VARCHAR(25),
  last_name VARCHAR(25),
  phone_number NUMERIC(20),
  email VARCHAR(45),
  birthday TEXT,
  notes VARCHAR(250)
);


CREATE TABLE reviews(
  review_id SERIAL PRIMARY KEY,
  contacts_id INTEGER REFERENCES contact(contact_id),
  rating INTEGER,
  comment TEXT
);