const Budget = require('../models/budget.models');


//create budget
const createBudget = async (req, res) => {
    try {
        const { name, amount, categories} = req.body //get name, email, password and mobile from request body
        const createdBy = req.user._id//get user id from request
        const budget = await Budget.create(
            {
                name,
                amount,
                categories,
                createdBy
            }
        )
        if (budget) {
            res.status(201).json({
                _id: budget._id,
                name: budget.name,
                amount: budget.amount,
                categories: budget.categories,
                createdBy: budget.createdBy,
                createdAt: budget.createdAt
            })
        } else {
            res.status(400).json({ message: 'Invalid budget data' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//get all budgets
const getAllBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ createdBy: req.user._id })
        if (budgets) {
            res.status(200).json(budgets)
        } else {
            res.status(404).json({ message: 'Budgets not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//getBudgetById
const getBudgetById = async (req, res) => {
    try {
        const { id } = req.params
        const budget = await Budget.findById(id)
        if (budget) {
            res.status(200).json(budget)
        } else {
            res.status(404).json({ message: 'Budget not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//updateBudget
const updateBudget = async (req, res) => {
    try{
        const {id} = req.params//get id from request params3
        const {name,amount,categories} = req.body//get name, email, password and mobile from request body


        const budget = await Budget.findByIdAndUpdate({_id:id},{
            name,
            amount,
            categories
        })

        if(budget){
            res.status(200).json({message: 'Budget updated successfully'})

        }else{
            res.status(404).json({message: 'Budget not found'})
        }




    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//deleteBudget
const deleteBudget = async (req, res) => {
    try{
        const {id} = req.params//get id from request params3

        const review = await Budget.findByIdAndDelete({_id:id})//delete user by id

        if(!review){
            return res.status(404).json({message: 'Budget not found'})
        }//if user is not deleted
        else{
            res.status(200).json({message: 'Budget deleted successfully'})
        }







    }catch(error){
        res.status(500).json({message: error.message})
    }
}



module.exports = {
    createBudget,
    getAllBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget
}//export all functions
