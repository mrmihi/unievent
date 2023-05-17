const express = require('express');
const {createBudget,getAllBudgets,getBudgetById,updateBudget,deleteBudget,deleteAllBudgets} = require('../controllers/budget.js');
const {protect,financialManagerProtect,adminProtect,organizationProtect,} = require('../../User/middleware/authMiddleware.js');
const {bprotect,budgetProtect} = require('../middleware/authBudgetMiddleware.js');
const budgetRouter = express.Router();//create router


budgetRouter.post('/create',createBudget);//create budget
budgetRouter.get('/',getAllBudgets);//get all budgets
// budgetRouter.put('/:id',protect,financialManagerProtect,updateBudget);//update budget
budgetRouter.delete('/:id',deleteBudget);//delete budget
budgetRouter.get('/:id',getBudgetById);//get budget by id
budgetRouter.delete('/delete',deleteAllBudgets);//delete all budgets


module.exports = budgetRouter;