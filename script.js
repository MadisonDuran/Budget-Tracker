class Budget {
    constructor() {
        this.income = [];
        this.expenses = [];
    }

    addIncome(desc, amount) {
        this.income.push({ desc, amount });
    }

    addExpense(desc, amount) {
        this.expenses.push({ desc, amount });
    }

    removeExpense(index) {
        this.expenses.splice(index, 1);
    }

    resetAll() {
        this.income = [];
        this.expenses = [];
    }

    getTotalIncome() {
        return this.income.reduce((sum, i) => sum + i.amount, 0);
    }

    getTotalExpenses() {
        return this.expenses.reduce((sum, e) => sum + e.amount, 0);
    }

    getBudgetLeft() {
        return this.getTotalIncome() - this.getTotalExpenses();
    }
}

class BudgetUI {
    constructor(budget) {
        this.budget = budget;

        //DOM Elements
        this.incomeDesc = document.getElementById('income-desc');
        this.incomeAmount = document.getElementById('income-amount');
        this.expenseDesc = document.getElementById('expense-desc');

    }
}