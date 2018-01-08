function UsuarioDAO(connection) {
    this._connection = connection();
}

UsuarioDAO.prototype.inserirUsuario = function (dados) {

    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("usuarios", function (error, collection) {
            collection.insert(dados);
            mongoclient.close();
        });
    });
}

UsuarioDAO.prototype.autenticar = function (dados, req, res) {
    req.session.autorizado = false;
    
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection("usuarios", function (error, collection) {
            collection.find(dados).toArray(function (erro, resultado) {
                if (resultado[0] !== undefined) {
                    req.session.autorizado = true;

                    req.session.usuario = resultado[0].usuario;
                    req.session.casa = resultado[0].casa;
                }else{
                    req.session.autorizado = false;
                }

                if (req.session.autorizado) {
                    res.redirect("jogo");
                } else {
                    var mensagem = [{
                            msg: 'Usuário ' + dados.usuario + ' não encontrado, verifique seu usuário e senha ou faça seu cadastro.',
                        }
                    ];
                    
                    res.render('index', {validacao: mensagem, dados: dados});
                }

            });

            mongoclient.close();
        });
    });
}

module.exports = function () {
    return UsuarioDAO;
}
