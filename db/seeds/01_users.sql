-- -- Users table seeds here (Example they gave us)
-- INSERT INTO users (name) VALUES ('Alice');
-- INSERT INTO users (name) VALUES ('Kira');

-- ---Apr 3rd - Adele will be working here--
INSERT INTO users (name, email, password, creator_status)
VALUES ('Alice', 'alice.cooks.lots@mail.com', 'password', FALSE),
('Bob', 'bob.writes@mail.com', 'password', TRUE),
('Carol', 'carol@carol.com', 'password', FALSE);

--current sample stories all be writen by Bob (users.id 2) who is the only one with TRUE creator_status
INSERT INTO stories (title, description, publish_status, creator_id) --timestamp
--Stories.id 1 in progress. Stories.id 2 published.
VALUES ('The Lost Shoe', 'Once I lost my shoe when walking through the forest.', FALSE, 2),
('Zorro', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porta, augue in fermentum vulputate, felis ligula auctor nunc, non rhoncus ex nisl sit amet ligula. Aliquam vehicula sem at purus luctus semper. Morbi pulvinar eu turpis at lacinia. Sed a enim pellentesque, porttitor lacus at, vulputate nisl. Etiam et ligula eget dolor tempus gravida sit amet ac risus. Sed sollicitudin facilisis consequat. Mauris ex dolor, vulputate ut velit in, luctus pharetra tortor. Fusce pulvinar, risus eget scelerisque bibendum, augue sem interdum massa, a convallis dui sem quis lacus. Aliquam erat volutpat. Mauris quis commodo lacus. Nunc turpis nisl, semper at sapien sed, viverra luctus elit. Fusce placerat pretium orci. Integer enim orci, tristique sit amet iaculis ut, eleifend eu turpis.', TRUE, 2);



INSERT INTO contributions (story_id, user_id, likes_id, content) --timestamp
-- Alice contributes to Bob's 1st story.
VALUES (1, 1, 2, 'I thought my laces were tied tight, but I guess not!'),
-- Carol contributes to Bob's 1st story. No likes for contribition.
(1, 3, null, '"My mom is going to be so mad at me!" I thought to myself.'),
-- Alice contributed to Bob's 2st story. Already published.
(2, 1, 3, 'Mauris ex dolor, vulputate ut velit in,' ),
-- Alice contributes again to Bob's 1st story.
(1, 1, null, 'This always happens when I want pizza.');


INSERT INTO likes (contribution_id, user_id)
--Carol likes Alice's contribution to 'The Lost Shoe' story
VALUES(3, 1),
--Bob likes Alice's contribution
(2, 1),
-- Alice likes her own contribution to Bob's 'Zorro'
(3, 1);
