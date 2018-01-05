module.exports = function (application) {
    application.get('/cadastro', function (req, res) {
        application.app.controllers.CadastroController.cadastro(application, req, res);
    });
    
    application.post('/cadastrar', function (req, res) {
        application.app.controllers.CadastroController.cadastrar(application, req, res);
    });
}