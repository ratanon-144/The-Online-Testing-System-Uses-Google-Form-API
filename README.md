# The-Online-Testing-System-Uses-Google-Form-API
ระบบการทดสอบออนไลน์โดยโดย Google Form API
install packet
    npm install react-google-login gapi-script googleapis googleapis-common mdb-react-ui-kit mdbreact  --force
ทดสอบ สร้าง google form
    custom.js 
ทดสอบ ส่ง google Gmail
    gmail-seen.js
ทดสอบ Google login แล้ว แสดง Profile
 ใช้ react ทดสอบอย่างง่าย
    npx create-react-app  demo // demo ชื่อโปรเจค
        fix  package.json 
                find >> 
                    "start": "react-scripts start",
                    "build": "react-scripts  build",
                edit >>
                    "start": "react-scripts --openssl-legacy-provider start",
                    "build": "react-scripts --openssl-legacy-provider build",

