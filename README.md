# The-Online-Testing-System-Uses-Google-Form-API
ระบบการทดสอบออนไลน์โดยโดย Google Form API

ในส่วนของ backend 
1. สร้างไฟล์  ".env" 
   MYSQL_HOST = <IP_SEVER>
   MYSQL_USER = <USER>
   MYSQL_PASSWORD = <PASSWORD>
   MYSQL_DATABASE = <NAME_DATABAS>
 
 2. ตืดตั้ง package เพิ่มเติม
    ใช้คำสั่ง npm install | yarn 
 3. คำสัง run server
    ใช้คำสั่ง npm run dev | yarn dev
 4. server run ที่ loacalhost port 8080 เข้าถึง api ที่ part api/accounts
 http://localhost:8080/api/accounts
 
--------------------------------------------------------
Node.js Rest CRUD API overview
Methods	Urls	Actions
GET	api/accounts	get all Accounts
GET	api/accounts/:id	get Account by id
POST	api/accounts	add new Account
PUT	api/accounts/:id	update Account by id
DELETE	api/accounts/:id	remove Account by id
DELETE	api/accounts	remove all Accounts
--------------------------------------------------------
อ้างอิงข้อมูลจาก
https://www.bezkoder.com/node-js-express-sequelize-mysql/
https://github.com/bezkoder/nodejs-express-sequelize-mysql
ขอขอบคุณ bezkoder

        
