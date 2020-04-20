const http = require("http");

const serverConst = {
    port: 3000
};

const server = http.createServer().listen(serverConst.port);
console.log(`Server start on http://localhost:${serverConst.port}`);

const wait = function (delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

server.on("request", async (req, res) => {
    console.log("request ->");
    await wait(100);
    console.log("-> response");
    res.writeHead(200, { "Content-Type": "text/json" });
    res.end('Прошло 100 миллисекунд');
});