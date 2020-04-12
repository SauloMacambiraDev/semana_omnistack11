const getDateTime = require('./getDateTime');

module.exports = req => {
    console.log('************************************************************');
    let date = new Date(); 
    date = getDateTime(date);

    console.log(`${req.method} request received from: ${req.ip} - ${date}`);
    console.log('Request headers:');
    console.log(req.headers);
    console.log('Request body:');
    console.log(req.body);
    console.log('Request Params:');
    console.log(req.params);
    console.log('Request Query String:');
    console.log(req.query);
    console.log('************************************************************\n');
}