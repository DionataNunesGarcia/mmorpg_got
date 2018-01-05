module.exports = function (application) {
    application.get('/', function (req, res) {
        application.app.controllers.IndexController.index(application, req, res);
    });
    
    application.post('/autenticar', function (req, res) {
        application.app.controllers.IndexController.autenticar(application, req, res);
    });
}