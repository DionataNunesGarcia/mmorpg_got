module.exports.jogo = function (application, req, res){
    
    if(req.session.autorizado !== true){
        res.send('usuario precisa fazer login');
        return;
    }
    
    res.render('jogo', {img_casa: req.session.casa});        
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
