INSERT INTO users(name,email,password)
VALUES ('abdul','abdul@gmail.com','aaa'),
('max','max@gmail.com','bbb'),
('will','will@gmail.com','ccc');


INSERT INTO stories(title,description,creator_id)
VALUES ('fox','Once upon a time',1),
('pig','story 1111',2),
('horr','scary story',3);

INSERT INTO contributions(creator_id,content,story_id,likes)
VALUES (1,'this is content1',1,3),
(2,'this is content2',2,4),
(3,'this is content3',3,5);