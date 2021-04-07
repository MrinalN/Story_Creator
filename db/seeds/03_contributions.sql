-----Last updated Apr 7th - Adele --

INSERT INTO contributions (story_id, contributor_id,likes, content, created_at)
-- Alice contributes to Bob's 1st story.
VALUES (1, 1, 2, 'I thought my laces were tied tight, but I guess not!', '2020-02-12T08:00:00.000Z'),
-- Carol contributes to Bob's 1st story. No likes for contribition.
(1, 3, null, '"My mom is going to be so mad at me!" I thought to myself.', '2020-02-05T08:00:00.000Z'),
-- Alice contributed to Bob's 2st story. Already published.
(2, 1, 1, 'Mauris ex dolor, vulputate ut velit in,', '2020-01-12T08:00:00.000Z' ),
-- Alice contributes again to Bob's 1st story.
(1, 1, null, 'This always happens when I want pizza.', Now());
