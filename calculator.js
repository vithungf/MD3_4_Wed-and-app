const http = require("http")
const fs = require("fs");
const qs = require("qs");
const server= http.createServer((req, res) => {
    if (req.method === "GET") {
        fs.readFile("./calculator.html", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(data)
                return res.end()
            }
        })
    } else {
        let data = ""
        req.on("data", chunk => {
            data += chunk
        })
        req.on("end", () => {
            let result = qs.parse(data)
            console.log(result);
            fs.readFile("./calculator.html","utf8" ,(err, data) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                    let finalResult = eval(`${result.a}${result.calculation}${result.b}`)
                    console.log(finalResult);
                    data = data.replace("Result:", `Result: ${finalResult}`)
                    res.writeHead(200, {"Content-Type": "text/html"})
                    res.write(data)
                    return res.end()
                }
            })
        })
        res.on("error", (err) => {
            console.log(err);
        })
    }
},)
server.listen(8000, () =>
    console.log("Server run on port 8000")
)