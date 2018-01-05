/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports.cadastro = function (application, req, res){
    res.render('cadastro', {validacao: {}, entidade: {}});
};

module.exports.cadastrar = function (application, req, res){
    var dados = req.body;
    
    req.assert('nome', 'Nome não pode ser vázio.').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vázio.').notEmpty();
    req.assert('senha', 'Senha não pode ser vázio.').notEmpty();
    req.assert('casa', 'Casa não pode ser vázio.').notEmpty();
    
    var erros = req.validationErrors();
    
    if(erros){
        res.render('cadastro', {validacao: erros, entidade: dados});
        return;
    }
    
    var connection = application.config.dbConnection;
    
    var UsuarioDAO = new application.app.models.UsuarioDAO(connection);
    var JogoDAO = new application.app.models.JogoDAO(connection);
    
    UsuarioDAO.inserirUsuario(dados);
    JogoDAO.gerarParametros(dados.usuario);
    
    res.send('pode cadastrar');
};

