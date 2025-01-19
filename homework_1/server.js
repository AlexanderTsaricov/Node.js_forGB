let countHome = 0;
let countAbout = 0;
const http = require("http");
const server = http.createServer((req, res) => {
    console.log("Запрос получен");
    if (req.url === "/") {
        countHome += 1;
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8",
        });
        res.end(
            `<a href="http://localhost:3000/about">About</a>\n<p>Просмотры: ${countHome}</p>`
        );
    } else if (req.url === "/about") {
        countAbout += 1;
        res.writeHead(200, {
            "Content-Type": "text/html; charset=UTF-8",
        });
        res.end(
            `<a href="http://localhost:3000/">Home</a>\n<p>Просмотры: ${countAbout}</p>`
        );
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html; charset=UTF-8",
        });
        res.end("<h1>По-моему ты чет перепутал</h1>");
    }
});
const port = 3000;
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
