/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();


router.get('/list', usuarioController.list);
router.get('/login', usuarioController.login);
router.post('/add', usuarioController.add);

module.exports = router;