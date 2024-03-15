const express = require('express');
let cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

var model = require('./routes/model');
app.listen(port, 'localhost', () => {
     console.log(`Server is up on port ${port}`);
});
app.use(express.static('public'));
app.use('/model', model);
