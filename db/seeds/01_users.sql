-----Last updated Apr 3rd - Adele--
INSERT INTO users (name, email, password, creator_status)
VALUES ('Alice', 'alice.cooks.lots@mail.com', 'password', FALSE),
('Bob', 'bob.writes@mail.com', 'password', TRUE),
('Carol', 'carol@carol.com', 'password', FALSE);

--current sample stories all be writen by Bob (users.id 2) who is the only one with TRUE creator_status
INSERT INTO stories (title, description, created_at, publish_date, creator_id)
--Bob's story 1 in progress.
VALUES ('The Lost Shoe', 'Once I lost my shoe when walking through the forest.','2020-01-12T08:00:00.000Z', null, 2),
--Bob's story 2 published.
('Zorro', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porta, augue in fermentum vulputate, felis ligula auctor nunc, non rhoncus ex nisl sit amet ligula. Aliquam vehicula sem at purus luctus semper. Morbi pulvinar eu turpis at lacinia. Sed a enim pellentesque, porttitor lacus at, vulputate nisl. Etiam et ligula eget dolor tempus gravida sit amet ac risus. Sed sollicitudin facilisis consequat. Mauris ex dolor, vulputate ut velit in, luctus pharetra tortor. Fusce pulvinar, risus eget scelerisque bibendum, augue sem interdum massa, a convallis dui sem quis lacus. Aliquam erat volutpat. Mauris quis commodo lacus. Nunc turpis nisl, semper at sapien sed, viverra luctus elit. Fusce placerat pretium orci. Integer enim orci, tristique sit amet iaculis ut, eleifend eu turpis.', '2019-12-12T08:00:00.000Z','2019-12-14T08:00:00.000Z', 2);



INSERT INTO contributions (story_id, contributor_id, content, created_at)
-- Alice contributes to Bob's 1st story.
VALUES (1, 1,'I thought my laces were tied tight, but I guess not!', '2020-02-12T08:00:00.000Z'),
-- Carol contributes to Bob's 1st story. No likes for contribition.
(1, 3, '"My mom is going to be so mad at me!" I thought to myself.', '2020-02-05T08:00:00.000Z'),
-- Alice contributed to Bob's 2st story. Already published.
(2, 1,'Mauris ex dolor, vulputate ut velit in,', '2020-01-12T08:00:00.000Z' ),
-- Alice contributes again to Bob's 1st story.
(1, 1, 'This always happens when I want pizza.', Now());

INSERT INTO like_table (contribution_id,user_id)
-- Alice likes first ( I thought my laces ) contribution
VALUES(1,1),
--Bob likes first
(1,2),
--Alice likes second
(2,1)




