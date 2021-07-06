let data = [];

module.exports = {
    post_json_data(req, res) {
        try{
            data = req.body;
            res.sendStatus(200);
        }catch(error){
            res.sendStatus(500).json('Erro interno do servidor');
        }
    },

    get_json_data(req, res){
        try{
            console.log(data);
            res.json(data);
        }catch(error){
            res.sendStatus(500).json('Erro interno do servidor');
        }
    }
};