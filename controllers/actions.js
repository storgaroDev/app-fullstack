const actionRouter = require('express').Router();
const Action = require('../models/action');

actionRouter.post('/', async (request, response) =>{
    const user = request.user;
    if (!user) {
        return response.sendStatus(401);
    }

    const { work } = request.body;
    console.log(work);
    if( !work ){
        return response.status(400).json({ error: 'El texto es requerido' });
    }


    const newAction = new Action({
        work,
    });
    // console.log(newTodo);
    const savedAction = await newAction.save();

    return response.status(201).json(savedAction)
});


actionRouter.get('/', async (request, response) =>{
    const user = request.user;
    if (!user) {
        return response.sendStatus(401);
    }
    const works = await Action.find({});
    return response.json(works);
});

actionRouter.delete('/:id', async (request, response) =>{

    const user = request.user;
    if (!user) {
        return response.sendStatus(401);
    }
  
    await Action.findByIdAndDelete(request.params.id);
    return response.sendStatus(204);
  });

module.exports = actionRouter;
