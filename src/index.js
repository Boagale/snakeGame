const fs = require('fs')
const http = require('http');
function loadContent(){
    const html = fs.readFileSync(`${__dirname}/public/snakeGame.html`,'utf-8');
    const style = fs.readFileSync(`${__dirname}/public/styles.css`,'utf-8')
    const script = fs.readFileSync(`${__dirname}/public/script.js`,'utf-8')
    
    return html.replace(/{%STYLE%}/,`<style>${style}</style>`).replace(/{%SCRIPT%}/,`<script>${script}</script>`)
}

const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        'Content-Type':'text/html'
    })
    res.end(loadContent())
});
server.listen(8000,()=>{console.log("Server listening on port 8000")});