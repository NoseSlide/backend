const TaskModel = require('../models/TaskModel');
const {isPast} = require('date-fns');

const TaskValidation = async(req, res, next)=>{

    const { macadress,type, title, description, when } = req.body;


    if(!macadress)
    return res.status(400).json({error: 'MacAdress é Obrigatório'});
    else if(!type)
    return res.status(400).json({error: 'Tipo é obrigatório'});
    else if(!title)
    return res.status(400).json({error: 'Título é obrigatório'});
    else if (!description)
    return res.status(400).json({error:'Descrição é obrigatório'});
    else if (!when)
    return res.status(400).json({error:'Data e hora é obrigatório'});
    else if (isPast(new Date(when)))
    return res.status(400).json({error:'Escolha uma data e hora futura'});
    else{
        let exists;

        if(req.params.id){
            exists= await TaskModel
                          .findOne({
                              '_id':{'$ne': req.params.id},
                              'when':{'$eq' : new Date(when)},
                              'macaddress':{'$in':macadress},
                              

                          });

        }else{

        exists= await TaskModel
                                .findOne(
                                    { 
                                        'when':{'$eq': new Date(when)},
                                        'macadress': {'$in':macadress} 
                                    });
            }
        if(exists){
            return res.status(400).json({error: 'Já existe uma tarefa nesse dia e horário'})
        }
        
        next();
    }



}


module.exports = TaskValidation;