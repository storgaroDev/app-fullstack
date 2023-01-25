const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.post('/', async (request, response) =>{
    const {name, email, password} = request.body;

    //Buscar si el email ya esta regsitrado
    const user = await User.findOne({ email });

    //Buscar si usuario existe
    if (user) {
        return response.status(400).json({ error: 'email ya se encuentra en uso' });
    }

    //
    if (!(name && email && password)) {
        return response.status(400).json({ error: 'todos los campos son requeridos' })
    }

    // Encriptar contraseña
    const saltRounds = 10;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Crear usuario en la base de datos 
    const newUser = new User({
        name,
        email,
        passwordHash,
    });

    // Guardar el modelo/usuario
    const savedUser = await newUser.save();

    return response.status(201).json(savedUser);
});

module.exports = userRouter;