const mongoose = require('mongoose');

mongoose.connect('mongodb://supervisoriotc01:supervisor2020@mongodb.supervisoriotcb.net:27017/supervisoriotc01', { useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.Promise = global.Promise;

module.exports = mongoose;