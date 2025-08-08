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
        this.expenseAmount = document.getElementById('expense-amount');
        this.totalBudget = document.getElementById('total-budget');
        this.totalExpenses = document.getElementById('total-expenses');
        this.budgetLeft = document.getElementById('budget-left');
        this.expenseList = document.getElementById('expense-list');

        // Event Listeners
    document.getElementById('add-income').addEventListener('click', () => this.addIncome());
    document.getElementById('add-expense').addEventListener('click', () => this.addExpense());
    document.getElementById('reset-all').addEventListener('click', () => this.resetAll());
    }
    addIncome() {
        const desc = this.incomeDesc.value.trim();
        const amount = parseFloat(this.incomeAmount.value);

        if (desc && amount > 0) {
          this.budget.addIncome(desc, amount);
          this.updateUI();
          this.clearInputs(this.incomeDesc, this.incomeAmount);
        } else {
          alert('Enter a valid income description and amount.');
        }
    }


 addExpense() {
        const desc = this.expenseDesc.value.trim();
        const amount = parseFloat(this.expenseAmount.value);

        if (desc && amount > 0) {
            this.budget.addExpense(desc, amount);
            this.updateUI();
            this.clearInputs(this.expenseDesc, this.expenseAmount);
        } else {
            alert('Enter a valid expense description and amount');
        }
    }
}

