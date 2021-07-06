const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users_model = require('../models/users');
const auth_config = require('../config/auth');

function generate_token(params = {}) {
    return jwt.sign(params, auth_config.secret);
}

module.exports = {

    async register_user(req, res) {
        try {
            const hashed_password = await bcrypt.hash(req.body.password, 10);

            const user_data = { full_name: req.body.full_name, username: req.body.username, password: hashed_password, admin: req.body.admin, suport: req.body.suport, overview: req.body.overview };

            const user_exist = await users_model.findOne({ username: req.body.username });

            if (user_exist) {
                res.json({ message: 'Usuário já cadastrado' });
                return;
            }

            const user = await users_model.create(user_data);
            res.json({ message: 'Usuário criado', user, token: generate_token({ id: user._id }) });
        } catch (error) {
            res.sendStatus(500).json('Erro interno do servidor');
        }
    },

    async login_user(req, res) {
        try {
            const user = await users_model.findOne({ username: req.body.username });

            if (user == null) {
                res.json({ message: 'Nome de usuário não pertence a nenhuma conta. verifique o nome de usuário e tente novamente' });
                return;
            }

            if (await bcrypt.compare(req.body.password, user.password)) {
                res.json({ message: 'Login válido', user, token: generate_token({ id: user._id }) });
            } else {
                res.json({ message: 'Credenciais inválidas' });
            }
        } catch (error) {
            res.sendStatus(500).json('Erro interno do servidor');
        }
    },

    async get_users(req, res) {
        res.json({ message: 'Usuários', users: await users_model.find() });
    },

    async get_logged_user(req, res) {
        const user = await users_model.findById(req.user_id)

        res.json({ message: 'User', user })
    },

    async update_user(req, res) {
        let hashed_password = ''
        if (req.body.password) {
            hashed_password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await users_model.findById(req.body.user_id);

        const user_exist = await users_model.findOne({ username: req.body.username });

        if (user_exist) {
            if(user_exist.username !== user.username){
                res.json({ message: 'Usuário já cadastrado' });
                return;
            }
        }

        await users_model.findOneAndUpdate({ _id: req.body.user_id }, {
            full_name: !req.body.full_name ? user.full_name : req.body.full_name,
            username: !req.body.username ? user.username : req.body.username,
            password: !req.body.password ? user.password : hashed_password,
            overview: !req.body.overview ? user.overview : req.body.overview,
        });

        res.json({ message: 'Usuário atualizado' });
    },

    async delete_user(req, res) {
        try {
            await users_model.deleteOne({ _id: req.body.user_id });

            res.json({ message: 'Usuário deletado' });
        } catch (error) {
            res.sendStatus(500).json('Erro interno do servidor');
        }
    }

};
