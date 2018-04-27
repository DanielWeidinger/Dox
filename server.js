const express = require('express');
const app = express();
const port = process.env.PORT || 2000;


app.use('/css', express.static(__dirname + "/app/css"));
app.use('/vendor', express.static(__dirname + "/app/vendor"));
app.use('/img', express.static(__dirname + "/app/img"));
app.use('/javascripts', express.static(__dirname + "/app/javascripts"));

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/app/index.html');
});


app.listen(port, () => {
    console.log("server is running on port %d", port);
});