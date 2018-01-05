/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports.index = function (application, req, res){
    res.render('index', {validacao: {}, dados: {}});
};

module.exports.autenticar = function (application, req, res){
    var dados = req.body;
    
    req.assert('usuario', 'O campo Usuário não pode ficar vázio.').notEmpty();
    req.assert('senha', 'O campo Senha não pode ficar vázio.').notEmpty();
    
    var erros = req.validationErrors();
    
    if(erros){
        res.render('index', {validacao: erros, dados: dados});
        return;
    }        
    
    var connection = application.config.dbConnection;
    
    var UsuarioDAO = new application.app.models.UsuarioDAO(connection);
    
    UsuarioDAO.autenticar(dados, req, res);
};
