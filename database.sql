CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

CREATE TABLE "favorites" (
    "id" SERIAL PRIMARY KEY,
    "url" VARCHAR(255) NOT NULL,
    "favorite_id" INTEGER REFERENCES "category"
);

-- Default categories. You may change them :)



INSERT INTO "favorites" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

DROP TABLE "favorites";

