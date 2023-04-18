const express = require('express');
const {createBudget,getAllBudgets,getBudgetById,updateBudget,deleteBudget} = require('../controllers/budget.js');
const {protect,financialManagerProtect,adminProtect,organizationProtect,} = require('../middleware/authMiddleware.js');
const {bprotect,budgetProtect} = require('../middleware/authBudgetMiddleware.js');
const budgetRouter = express.Router();//create router


budgetRouter.post('/create',bprotect,budgetProtect,createBudget);//create budget
budgetRouter.get('/',protect,financialManagerProtect,getAllBudgets);//get all budgets
budgetRouter.get('/:id',protect,financialManagerProtect,getBudgetById);//get budget by id
budgetRouter.put('/:id',protect,financialManagerProtect,updateBudget);//update budget
budgetRouter.delete('/:id',protect,financialManagerProtect,deleteBudget);//delete budget


module.exports = budgetRouter;