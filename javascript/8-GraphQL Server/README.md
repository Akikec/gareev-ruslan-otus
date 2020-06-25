RestAPI

mongodb-in-memory, express, cors, helmet, bodyParser, morgan
точки дотсупа:
GET / - выбирает все из базы, вместе с данными, поля произвольный, но у меня получилось:
title - краткое описание чего в этом урле будет
url - сам урл rss фида для разбора
data - разпарсиные данные ввиде items
GET /urls - выдает только title и url
GET /data - выдает только data со всеми items что были в фиде.
POST / - создаст новую запись
PUT / - обновить по иду запись
DELETE / - удаляет по иду запись