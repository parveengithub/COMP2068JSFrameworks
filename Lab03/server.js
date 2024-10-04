
const connect = require('connect');
const url = require('url');
const http = require('http');


function calculate(req, res) {
    const parsedUrl = url.parse(req.url, true); 
    const queryObject = parsedUrl.query;
    
    
    if (!queryObject.x || isNaN(queryObject.x) || !queryObject.y || isNaN(queryObject.y)) {
        res.end('Error: Please provide valid numbers for x and y');
        return;
    }

    const method = queryObject.method;
    const x = parseFloat(queryObject.x);
    const y = parseFloat(queryObject.y);
    let result;
    let operation;

    
    switch (method) {
        case 'add':
            result = x + y;
            operation = '+';
            break;
        case 'subtract':
            result = x - y;
            operation = '-';
            break;
        case 'multiply':
            result = x * y;
            operation = '*';
            break;
        case 'divide':
            if (y !== 0) {
                result = x / y;
                operation = '/';
            } else {
                res.end('Error: Cannot divide by zero');
                return;
            }
            break;
        default:
            res.end('Error: Invalid method. Use add, subtract, multiply, or divide');
            return;
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`${x} ${operation} ${y} = ${result}`);
}

const app = connect();
app.use('/lab2', calculate);


http.createServer(app).listen(3000, () => {
    console.log('Server running at http://localhost:3000/lab2');
});
