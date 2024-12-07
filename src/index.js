const fs = require('fs')
const http = require('http');

const html = fs.readFileSync(`${__dirname}/public/snakeGame.html`,'utf-8')
const css = fs.readFileSync(`${__dirname}//public/styles.css`,'utf-8');
const script = fs.readFileSync(`${__dirname}//public/script.js`,'utf-8');

const server = http.createServer((req,res)=>{
    let responce = html.replace(/{%STYLE%}/,`<style>${css}</style>`).replace(/{%SCRIPT%}/,`<script>${script}</script>`)
    res.writeHead(200,{
        'Content-Type':'text/html'
    })
    res.end(responce);
});
server.listen(8000,()=>{console.log("Server listening on port 8000")});