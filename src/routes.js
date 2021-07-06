const express = require('express');

const router = express.Router();

const json_data_controller = require('./controllers/json_data');
const users_controller = require('./controllers/users');

const auth_middleware = require('./middleware/auth');

router.post('/post_json_data', json_data_controller.post_json_data);

router.post('/register_user', users_controller.register_user);
router.post('/login_user', users_controller.login_user);

router.use(auth_middleware);

router.get('/get_json_data', json_data_controller.get_json_data);

router.get('/get_users', users_controller.get_users);

router.get('/get_logged_user', users_controller.get_logged_user);

router.put('/update_user', users_controller.update_user);

router.post('/delete_user', users_controller.delete_user);

module.exports = router;
