const { User } = require('../models');
const bcrypt = require('bcryptjs');
const servToken = require('../services/token');
const usuario = require('../models/usuario');

module.exports = {

    list: async (req, res, next) => {
        try {
            const re = await usuario.findAll()
            res.status(200).json({ re })

        } catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }



    },

    add: async (req, res, next) => {
        try {

            const re = await User.create(req.body)
            res.status(200).json(re)

        } catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)

        }

    },

    register: async (req, res, next) => {
        res.status(200).send('Tambien lo haremos')
    },

    login: async (req, res, next) => { //el ext es por si el programa se queda en algún error, no se pegue y pueda seguir avanzando
        try {
            const user = await User.findOne({ where: { email: req.body.email } }) //consultar si el usuario existe find one es que encuentre uno, con que encuentre uno es suficiente
            if (user) {//si el usuario existe
                const contrasenhaValida = bcrypt.compareSync(req.body.password, user.password);
                if (contrasenhaValida) {//si es password es valido creamos el token
                    const token = servToken.encode(user.id, user.rol)

                    res.status(200).send({
                        auth: true,
                        tokenReturn: token,
                        user: user
                    })

                } else {
                    res.status(401).json({ 'error': 'Usuario o contraseña invalidos' })
                }

            } else {
                res.status(404).json({ 'error': 'Usuario o contraseña invalidos' })

            }
        } catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }
    }
}

