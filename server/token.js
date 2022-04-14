const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.get("/getCookie", (req, res) => {
    res.send(`Token : ${true}`);
    console.log("Token : ", true);
})

app.listen(3000, function() {
    console.log("localhost:3000");
})


// 4번 문제는 모르겠습니다.
