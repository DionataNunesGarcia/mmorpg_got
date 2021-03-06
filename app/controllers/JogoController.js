module.exports.jogo = function (application, req, res){    
    if(req.session.autorizado !== true){        
        var validacao = [{
                msg: 'Usuário precisa fazer login para acessar o jogo.'
            }
        ];
        res.render('index', {validacao: validacao, dados: {}});
        return;
    }
    
    var msg = '';
    if(req.query.msg !== ''){
        msg = req.query.msg;
    }
    
    var connection = application.config.dbConnection;

    var JogoDAO = new application.app.models.JogoDAO(connection);
    var usuario = req.session.usuario;
    var casa = req.session.casa;
    
    JogoDAO.iniciaJogo(res, usuario, casa, msg);    
}

module.exports.suditos = function (application, req, res){
    if(req.session.autorizado !== true){        
        var validacao = [{
                msg: 'Usuário precisa fazer login para acessar o jogo.'
            }
        ];
        
        res.render('index', {validacao: validacao, dados: {}});
        return;
    }
    res.render('aldeoes', {validacao: {}, dados: {}});    
}

module.exports.pergaminhos = function (application, req, res){
    if(req.session.autorizado !== true){        
        var validacao = [{
                msg: 'Usuário precisa fazer login para acessar o jogo.'
            }
        ];
        
        var connection = application.config.dbConnection;
        var JogoDAO = new application.app.models.JogoDAO(connection);
        
        var usuario = req.session.usuario;
        JogoDAO.getAcoes(usuario, res);
        
        res.render('index', {validacao: validacao, dados: {}});
        return;
    }
    res.render('pergaminhos', {validacao: {}, dados: {}});
}

module.exports.ordenar_acao_sudito = function (application, req, res){
    if(req.session.autorizado !== true){        
        var validacao = [{
                msg: 'Usuário precisa fazer login para acessar o jogo.'
            }
        ];
        res.render('index', {validacao: validacao, dados: {}});
        return;
    }
    var dados = req.body;    
    req.assert('acao', 'Ação não pode ser vázio.').notEmpty();
    req.assert('quantidade', 'Quantidade não pode ser vázio.').notEmpty();
    
    var erros = req.validationErrors();    
    if(erros){
        res.redirect('jogo?msg=A');
        return;
    }
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);
    
    dados.usuario = req.session.usuario;
    JogoDAO.acao(dados);     
    
    res.redirect('jogo?msg=B');
}

module.exports.sair = function (application, req, res){
    req.session.destroy(function (){
        var validacao = [{
                msg: 'Você saiu do jogo',
            }
        ];

        res.render('index', {validacao: validacao, dados: {}});
    });
}