// main2.js
"use strict";

const port = 3000,
  express = require("express"),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  Subscriber = require("./models/subscriber"),
  app = express();
/**
 * @TODO: Listing 14.1 (p. 205)
 * Mongoose를 사용한 MongoDB 연결
 */
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://mkh990817:ansrudgh1@ut-nodejs.06q6zmz.mongodb.net/?retryWrites=true&w=majority&appName=ut-nodejs/ut-node",
  {useNewUrlParser: true}
);

const db = mongoose.connection;

/**
 * @TODO: Listing 14.2 (p. 206)
 * 데이터베이스 연결 이벤트 처리
 */
db.once("open", () => {
});
/**
 * Listing 14.4 (p. 207)
 * 생성과 저장 구문
 */
//version1
let sub1 = new Subscriber({
  name: "k0ho",
  email: "mkh990817@gmail.com",
  phone: 12345678,
  newsletter: true
});
sub1.save()
  .then(savedDoc => {
    console.log(savedDoc);
  })
  .catch(error => {
    console.log(error);
  });
//version2
Subscriber.create({
  name: "kyoungho-Moon",
  email: "kyoungho@gmail.com",
  phone: 87654321,
  newsletter: false
})
.then(savedDoc => {
  console.log(savedDoc);
})
.catch(error => {
  console.log(error);
});
// (선택) DB find() after 14.5
let tom = Subscriber
  .findOne({name: "kyoungho-Moon"})
  .where(
    "email",
  );
console.log("Found", tom);

/**
 * @TODO: Listing 14.6 (p. 208)
 * 데이터베이스에서 데이터 검색
 */
var query = Subscriber.findOne({
  name: "k0ho",
}).where("email", /mkh990817/);

query.exec()
     .then((error, data) => {
      if (data) console.log(data.name);
     });

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