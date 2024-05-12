// errorController.js
"use strict";

const httpStatus = require("http-status-codes");

/**
 * Listing 11.2 (p. 168)
 * 에러 컨트롤러 추가
 */
exports.logErrors = (err, req, res, next) => {
  // 에러 처리를 위한 미들웨어 추가
  console.error(err.stack); // 에러 스택 로깅
  next(err); // 다음 미들웨어 함수로 에러 전달
};

/**
 * Listing 11.3 (p. 169)
 * 사용자 정의 메시지로 빠진 라우트 및 에러 대응
 */
exports.resNotFound = (req, res) => {
  // 404 상태 코드로 응답
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  // res.send(`${errorCode} | The page does not exist!`);

  /**
   * Listing 11.5 (p. 170)
   */
  res.sendFile(`./public/${errorCode}.html`, {
    // 404.html 파일의 콘텐츠 전송
    root: "./",
  });
};

exports.resInternalError = (err, req, res, next) => {
  // 500 상태 코드로 모든 에러 처리
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.error(`ERROR occurred: ${err.stack}`);
  res.status(errorCode);
  // res.send(`${errorCode} | Sorry, our app is experiencing a problem!`);

  res.sendFile(`./public/${errorCode}.html`, {
    // 500.html 파일의 콘텐츠 전송
    root: "./",
  });
};