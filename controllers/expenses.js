const userExpense = require('../models/userExpense');

exports.postAddExpense = async (req, res, next) => {
    
    try{
        
        let amount = req.body.amount;
        let description = req.body.description;
        let category= req.body.category;

        const data = await userExpense.create({
            amount: amount,
            description: description,
            category: category

        })
        res.status(201).json({userExpense: data});       
    }
     
    catch{
        console.log(error);
        res.status(500).json({error: error});
    }

}

exports.getAllExpenses = async (req, res, next) => {

    try{
        const data = await userExpense.findAll();
        res.status(201).json(data);       
    }
     
    catch{
        console.log(error);
        res.status(500).json({error: error});
    }
}

exports.deleteExpense = async (req, res, next) => {

    try{
        const userId = req.params.userId;
        if(!userId){
            res.status(400).json({error: 'id is missing'});
        }
        await userExpense.destroy({where : {id: userId}});
        res.sendStatus(200);      
    }
     
    catch{
        console.log(error);
        res.status(500).json({error: 'error occusred'});
    }
}