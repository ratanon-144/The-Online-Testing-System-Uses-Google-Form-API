# The-Online-Testing-System-Uses-Google-Form-API
 ระบบการทดสอบออนไลน์โดยโดย Google Form API
##  ในส่วนของ backend 
1. สร้างไฟล์  ".env"  <br>
   MYSQL_HOST = [IP_SEVER] <br>
   MYSQL_USER = [USER] <br>
   MYSQL_PASSWORD = [<PASSWORD] <br>
   MYSQL_DATABASE = [NAME_DATABAS] <br>
 
 2. ตืดตั้ง package เพิ่มเติม <br>
   ```  npm install | yarn ```  <br>
 3. คำสัง run server <br>
    ``` npm run dev | yarn dev  ``` <br>
 4. server run ที่ loacalhost port 8080 เข้าถึง api ที่ part api/accounts <br>
``` http://localhost:8080/api/accounts ``` <br>
 
##  Node.js Rest CRUD API overview
Methods	Urls	Actions <br>
GET	api/accounts	get all Accounts <br>
GET	api/accounts/:id	get Account by id <br>
POST	api/accounts	add new Account <br>
PUT	api/accounts/:id	update Account by id <br>
DELETE	api/accounts/:id	remove Account by id <br>
DELETE	api/accounts	remove all Accounts <br>
## อ้างอิงข้อมูลจาก
https://www.bezkoder.com/node-js-express-sequelize-mysql/ <br>
ขอขอบคุณ [bezkoder](https://github.com/bezkoder/nodejs-express-sequelize-mysq)

        
