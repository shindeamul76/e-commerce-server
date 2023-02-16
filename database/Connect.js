const mongoose = require('mongoose');

mongoose.set('strictQuery', false);


const ConnectDB = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = ConnectDB