// main1.js
"use strict";

const port = 3000,
  express = require("express"),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  mongodb = require("mongodb"),
  app = express();

/**
 * @TODO: Listing 14.1 (p. 205)
 * Mongoose를 사용한 MongoDB 연결
 */
// Mongoose 모듈의 요청
const mongoose = require("mongoose");
// 데이터베이스 연결 설정
mongoose.connect(
  "mongodb+srv://mkh990817:ansrudgh1@ut-nodejs.06q6zmz.mongodb.net/?retryWrites=true&w=majority&appName=ut-nodejs/ut-node.ut-node",
  {useNewUrlParser: True}
);
// 애플리케이션이 데이터베이스에 연결됐을 때 메시지 출력
// db 변수에 데이터베이스 할당
const db = mongoose.connection;


/**
 * @TODO: Listing 14.2 (p. 206)
 * 데이터베이스 연결 이벤트 처리
 */

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * @TODO: Listing 14.3 (p. 206)
 * 스키마 정의
 */

const subscriberSchema = mongoose.Schema({
  name : String,
  email : String,
  zipCode : Number,
  newsletter : Boolean
});

var Subscriber = mongoose.model("Subscriber", subscriberSchema);

/**
 * @TODO: Listing 14.4 (p. 207)
 * 생성과 저장 구문
 */

var subscriber1 = new subscriberSchema({
  name : 
})


app.set("port", process.env.PORT || port);
app.set("view engine", "ejs");

app.use(layouts);
app.use(express.static("public"));

app.get("/", homeController.getHomePage);
app.get("/name/:myName", homeController.respondWithName2);

/**
 * Listing 11.4 (p. 169)
 * 사용자 정의 메시지를 통한 에러와 없는 라우트 처리
 */
app.use(errorController.logErrors);
app.use(errorController.resNotFound); // main.js에 에러 처리 미들웨어 추가
app.use(errorController.resInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
