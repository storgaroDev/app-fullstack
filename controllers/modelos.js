const modelosRouter = require('express').Router();
const Modelos = require('../models/modelos');

modelosRouter.post('/', async (request, response) =>{
    const user = request.user;
    if (!user) {
        return response.sendStatus(401);
    }

    const { modelos } = request.body;
    // console.log(work);
    // if( !modelos ){
    // }


    const newModelos = new Modelos({
        modelos,
    });
    // console.log(newTodo);
    const savedModelos = await newModelos.save();

    return response.status(201).json(savedModelos)
});


modelosRouter.get('/', async (request, response) =>{
    const user = request.user;
    if (!user) {
        return response.sendStatus(401);
    }
    const modelos = await Modelos.find({});
    return response.json(modelos);
});

modelosRouter.delete('/:id', async (request, response) =>{

    const user = request.user;
    if (!user) {
        return response.sendStatus(401);
    }
  
    await Modelos.findByIdAndDelete(request.params.id);
    return response.sendStatus(204);
  });

module.exports = modelosRouter;