module.exports = function (application) {
    application.get('/jogo', function (req, res) {
        application.app.controllers.JogoController.jogo(application, req, res);
    });
    
    application.get('/sair', function (req, res) {
        application.app.controllers.JogoController.sair(application, req, res);
    });
    
    application.get('/suditos', function (req, res) {
        application.app.controllers.JogoController.suditos(application, req, res);
    });
    
    application.get('/pergaminhos', function (req, res) {
        application.app.controllers.JogoController.pergaminhos(application, req, res);
    });
    
    application.post('/ordenar-acao-sudito', function (req, res) {
        application.app.controllers.JogoController.ordenar_acao_sudito(application, req, res);
    });
}