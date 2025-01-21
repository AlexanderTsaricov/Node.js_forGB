const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

function readCount() {
    const data = fs.readFileSync("count.json", "utf-8");
    const result = JSON.parse(data);
    return result;
}

function writeCount(data) {
    fs.writeFileSync("count.json", JSON.stringify(data));
}

app.get("/", (req, res) => {
    const count = readCount();
    ++count.count_head;
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    res.send(
        `<h1>Корневая страница</h1>
        <p>Просмотров: ${count.count_head}</p>
        <a href=${fullUrl + "about"}>Обо мне</a>
        `
    );
    writeCount(count);
});

app.get("/about", (req, res) => {
    const count = readCount();
    ++count.count_about;
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const homeUrl = fullUrl.replace("/about", "");
    res.send(
        `<h1>Обо мне</h1>
        <p>Просмотров: ${count.count_about}</p>
        <a href=${homeUrl}>Главная страница</a>
        `
    );
    writeCount(count);
});

app.listen(port, () => {
    console.log("Сервер запущен");
});
