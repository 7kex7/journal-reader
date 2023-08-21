# journal-reader

## Это сайт на `node js` для добавления и чтения книг, журналов, комиксов, манги


backend -> express js (с исп. PostgreSQL),  
frontend -> react (js).



> ### Стек
>
> 1. backend (папка *server*)
>     - "bcrypt": "^5.1.0",
>     - "cors": "^2.8.5",
>     - "dotenv": "^16.0.3",
>     - "express": "^4.18.2",
>     - "express-fileupload": "^1.4.0",
>     - "jsonwebtoken": "^8.5.1",
>     - "pg": "^8.8.0",
>     - "pg-hstore": "^2.3.4",
>     - "sequelize": "^6.25.5",
>     - "uuid": "^9.0.0"
> 2. frontend
>     - "axios": "^1.1.3",
>     - "bootstrap": "^5.2.2",
>     - "dotenv": "^16.0.3",
>     - "jwt-decode": "^3.1.2",
>     - "mobx": "^6.7.0",
>     - "mobx-react-lite": "^3.4.0",
>     - "react": "^18.2.0",
>     - "react-bootstrap": "^2.6.0",

все запуски через npm start

### Какие страницы есть в приложении

- Админ панель (при наличии у пользователья соответствующих прав)  
(client/src/pages/Admin.jsx)
- Каталог (client/src/pages/Catalog.jsx)
- Страница с произведением (client/src/pages/Manga.jsx)
- Профиль (client/src/pages/Profile.jsx)
- Избранное (client/src/pages/Favorites.jsx)
- Авторизация/регистрация (производится с помощью web token) (client/src/pages/Auth.jsx)
- Глава (client/src/pages/Chapter.jsx)

### .env

*backend*  
Сервер работает с PostgreSQL, в файле .env (server/.env) указаны только имена переменных  

```
PORT=  

DB_NAME=  
DB_PASSWORD=  
DB_USER=  
DB_HOST=  
DB_PORT=  

SECRET_KEY=  
```  

*frontend*  
В .env у клиента (client/.env) расположена переменная только для url к серверу

```
REACT_APP_API_URL=http://localhost:5001/ # по умолчанию
```

*Краткий просмотр:*

![image](https://user-images.githubusercontent.com/120056256/206875240-da5aaa3f-6f7f-49ad-a5dc-763ab666adb7.png)

![image](https://user-images.githubusercontent.com/120056256/206875333-b220a670-7b0c-4907-87d1-24ae0b27adab.png)

![image](https://user-images.githubusercontent.com/120056256/206875719-3a97c7e9-077f-4d52-a4d8-697a14754955.png)

![image](https://user-images.githubusercontent.com/120056256/206875400-b73cd378-efd3-45f9-a51a-804fe964888d.png)

![image](https://user-images.githubusercontent.com/120056256/206875640-9611a5fd-b920-4d9e-8854-205409707ffe.png)
