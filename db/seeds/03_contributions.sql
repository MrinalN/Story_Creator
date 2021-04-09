-----Last updated Apr 7th - Adele --

INSERT INTO contributions (story_id, contributor_id, content, created_at)
-- AliceTheCamelCase contributes to Brontë3's 1st story.
VALUES (1, 1, 'I thought my laces were tied tight, but I guess not!', '2020-02-12T08:00:00.000Z'),
-- Carol contributes to Brontë3's 1st story. No likes for contribition.
(1, 3, '"My mom is going to be so mad at me!" I thought to myself.', '2020-02-05T08:00:00.000Z'),
-- AliceTheCamelCase contributed to Brontë3's 2st story. Already published.
(2, 1, 'Suddenly, a unicorn appeared before them.', '2020-01-12T08:00:00.000Z' ),
-- AliceTheCamelCase contributes again to Brontë3's 1st story.
(4, 1, 'This always happens when I want pizza.', Now()),
-- Zigazigaza contributes to Brontë3's 1st story.
(1, 5, 'well it is not a big deal so whats the problem?', Now()),
-- Brontë3 contributes again to Zigazigaza's 1st story.
(2, 2, '"HEY!" shouted a familiar voice from the corner"', '2020-05-12T08:00:00.000Z'),
-- AliceTheCamelCase contributes again to Zigazigaza's 2nd story.
(5, 1, 'this story is stolen from Kafka - not cool', '2019-12-14T08:00:00.000Z'),
-- Carol contributes to Zigazigaza's 1st story.
(3, 2, 'start and he had already burnt all the meat!', '2020-11-12T08:00:00.000Z');
