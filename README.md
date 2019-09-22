# record expense
不讓媽媽看到的爸爸支出記帳表

## Features
- 列出所有的支出
- 篩選支出列別
- 修改支出
- 新增支出
- 刪除刪除
- 使用者登入、登出、註冊
- Facebook登入
- google登入
## Quick view

![index page](https://raw.githubusercontent.com/newman0934/expense-record-mongodb/master/public/img/index.png)
![edit page](https://raw.githubusercontent.com/newman0934/expense-record-mongodb/master/public/img/edit.png)
![login page](https://raw.githubusercontent.com/newman0934/expense-record-mongodb/master/public/img/login.png)
![register page](https://raw.githubusercontent.com/newman0934/expense-record-mongodb/master/public/img/register.png)
## Environment set up
- bcryptjs: ^2.4.3,
- body-parser: ^1.19.0,
- connect-flash: ^0.1.1,
- dotenv: ^8.1.0,
- express: ^4.17.1,
- express-handlebars: ^3.1.0,
- express-session: ^1.16.2,
- method-override: ^3.0.0,
- mongoose: ^5.6.13,
- passport: ^0.4.0,
- passport-facebook: ^3.0.0,
- passport-local: ^1.0.0,
- passport-google-oauth20: ^2.0.0

### Installation
- Download ZIP
- 解壓縮ZIP檔案
- 下載nvm並安裝
- 打開cmd
- cd到檔案位址
- 在cmd輸入nvm install 10.15.0
- 在cmd輸入nvm use 10.15.0
- 安裝mongodb
- 安裝mongoose
- 在mongoose建立一個record資料庫
- cd到seeds資料夾
- 輸入node seeder.js
- cd到expense-record-mongodb位址
- 在根目錄新增一個.env檔案並把以下code輸入到裡面
```js
FACEBOOK_ID=你的facebook_id
FACEBOOK_SECRET=你的facebook密鑰
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback

GOOGLE_ID=你的google id
GOOGLE_SECRET=你的google 密碼
GOOGLE_CALLBACK=http://localhost:3000/auth/google/callback
```
- 輸入node app.js
- 在瀏覽器上進入http://localhost:3000

- 測試帳號
```js
Email=caesar@gmail.com
password=111
```