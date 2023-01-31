const express = require('express');

const router = express.Router();

const expensesController = require('../controllers/expenses');

router.get('/expenses', expensesController.getAllExpenses);

router.post('/add-expense', expensesController.postAddExpense);

router.post('/delete-expense/:userId', expensesController.deleteExpense);

module.exports = router;