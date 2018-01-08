function JogoDAO(connection) {
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function (usuario) {

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("jogo", function (error, collection) {
            collection.insert({
                usuario: usuario,
                moeda: 15,
                suditos: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });

            mongoclient.close();
        });
    });
}

JogoDAO.prototype.autenticar = function (dados, req, res) {
    req.session.autorizado = false;

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("usuarios", function (error, collection) {
            collection.find(dados).toArray(function (erro, resultado) {

                if (resultado[0] !== undefined) {
                    req.session.autorizado = true;

                    req.session.usuario = resultado[0].usuario;
                    req.session.casa = resultado[0].casa;
                } else {
                    req.session.autorizado = false;
                }

                if (req.session.autorizado) {
                    res.redirect("jogo");
                } else {
                    var validacao = [{
                            msg: 'Usuário ' + dados.usuario + ' não encontrado, verifique seu usuário e senha ou faça seu cadastro.',
                        }
                    ];

                    res.render('index', {validacao: validacao, dados: dados});
                }

            });

            mongoclient.close();
        });
    });
}

JogoDAO.prototype.iniciaJogo = function (res, usuario, casa, msg) {

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("jogo", function (error, collection) {
            collection.find({usuario: usuario}).toArray(function (erro, resultado) {

                res.render('jogo', {img_casa: casa, jogo: resultado[0], msg: msg});
                mongoclient.close();
            });
        });
    });
}

JogoDAO.prototype.acao = function (dados) {

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("acao", function (error, collection) {
            var date = new Date();
            var tempo = null;
            
            switch(dados.acao){
                case '1': 
                    tempo = 1 * 60 * 60000;
                    break;
                case '2': 
                    tempo = 2 * 60 * 60000;
                    break;
                case '3': 
                    tempo = 5 * 60 * 60000;
                    break;
                case '4': 
                    tempo = 5 * 60 * 60000;
                    break;
            }
            
            dados.acao_termina_em = date.getTime() + tempo;
            console.log(dados);
            collection.insert(dados);
            mongoclient.close();
        });
    });
}

module.exports = function () {
    return JogoDAO;
}
