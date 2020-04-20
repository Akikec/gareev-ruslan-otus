const http = require("http");

async function request() {
    return new Promise(resolve => {
    const options = {
        host: '127.0.0.1',
        port: constRequest.port,
        method: 'GET',
        path: ""
    };

    console.log("request send");
    var req = http.request(options, res => {
        res.on("data", () => {});
        res.on("end", () => {
            console.log("response send");
            resolve();
        });
    });
    req.on('error', (err) => console.error(err));
    req.end();
    });
};

async function start(countRequest, isParallel) {
    const arrRequests = new Array(countRequest).fill(request);
    if (isParallel) {
        Promise.all(arrRequests.map((v,i) => v(i)));
    } else {
        for (const request of arrRequests) await request();
    }
};
const scriptArgs = process.argv.slice(2);
const constRequest = {
    isParallel: false,
    port: 3000,
    hostname: '127.0.0.1',
    N: Number(scriptArgs[0]) || 5,
    Parallel: scriptArgs[1] === "true" || false
};
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain');
    res.end('');
})
server.listen(constRequest.port, constRequest.hostname, () => {
    console.log(`Server running`)
    start(constRequest.N, constRequest.Parallel);
})