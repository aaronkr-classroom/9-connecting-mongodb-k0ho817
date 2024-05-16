// controllers/subscribersController.js
"use strict";

// 구독자 모델을 요청
const Subscriber = require("../models/subscriber");

/**
 * Listing 15.1 (p. 215)
 * 구독자 컨트롤러의 제작 - 콜백 함수
 */
// OLD: 데이터베이스로부터의 데이터를 다음 미들웨어 함수로 전달하기 위해
exports.getAllSubscribers = (req, res, next) => {
  Subscriber.find({}, (error, subscribers) => {
    // 구독자 모델에서 검색 쿼리
    if (error) next(error); // 에러를 미들웨어 함수로 전달
    req.data = subscribers; // 요청 객체에 대해 몽고DB로부터 돌아온 데이터의 세팅
    next(); // 다음 미들웨어 함수로 진행

    // render the subscribers view
    res.render("subscribers", {
      subscribers: subscribers,
    });
  });
};

/**
 * Listing 15.7 (p. 223)
 * 구독자 컨트롤러의 제작 - 프로미스
 */
// getAllSubscribers2 액션의 재작성
exports.getAllSubscribers2 = (req, res, next) => {
  Subscriber.find({})
    .exec() // find 쿼리로부터 프로미스를 리턴
    .then((subscribers) => {
      // 저장된 데이터를 다음 then 코드 블록에 전달
      // res.send(subscribers);
      res.render("subscribers", {
        subscribers: subscribers,
      }); // 데이터베이스로부터 결과 제공
    })
    .catch((error) => {
      // 프라미스에서 리젝트된 에러들을 캐치
      console.log(`Error fetching subscribers: ${error.message}`);
      return [];
    })
    .then(() => {
      // 프라미스 체인의 종료와 메시지 로깅
      console.log("Subscriber promise complete");
    });
};

/**
 * Listing 15.6 (p. 220)
 * 구독 라우트를 위한 컨트롤러 액션
 */
// 구독 페이지를 렌더링하기 위한 액션
exports.getSubscriptionPage = (req, res) => {
  res.render("subscribe");
};

// 구독자들을 저장하기 위한 액션
exports.saveSubscriber = (req, res) => {
  console.info(req.body);
  console.log();
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email
  }); // 새로운 구독자 추가

  /**
   * Listing 15.8 (223-224)
   */
  // 새로운 구독자 저장
  newSubscriber
    .save()
    .then((result) => {
      // 프라미스 새 구독자 저장
      res.render("thanks");
    })
    .catch((error) => {
      if (error) res.send(error);
    });
};