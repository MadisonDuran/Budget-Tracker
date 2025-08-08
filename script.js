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

        // DOM Elements (updated to match your HTML)
        this.incomeDesc = document.getElementById('income__desc');
        this.incomeAmount = document.getElementById('income__amount');
        this.expenseDesc = document.getElementById('expense__desc');
        this.expenseAmount = document.getElementById('expense-amount');
        this.totalBudget = document.getElementById('total__budget');
        this.totalExpenses = document.getElementById('total__expenses');
        this.budgetLeft = document.getElementById('budget__left');
        this.expenseList = document.getElementById('expense__list');

        // Event Listeners (updated to match your HTML)
        document.getElementById('add-income').addEventListener('click', () => this.addIncome());
        document.getElementById('add-expense').addEventListener('click', () => this.addExpense());
        document.getElementById('reset__all').addEventListener('click', () => this.resetAll());
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

    removeExpense(index) {
        this.budget.removeExpense(index);
        this.updateUI();
    }

    resetAll() {
        if (confirm('Are you sure you want to reset everything?')) {
            this.budget.resetAll();
            this.updateUI();
        }
    }

    updateUI() {
        this.totalBudget.textContent = this.budget.getTotalIncome().toFixed(2);
        this.totalExpenses.textContent = this.budget.getTotalExpenses().toFixed(2);
        this.budgetLeft.textContent = this.budget.getBudgetLeft().toFixed(2);

        // Update expense table
        this.expenseList.innerHTML = '';
        this.budget.expenses.forEach((exp, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${exp.desc}</td>
                <td>${exp.amount.toFixed(2)}</td>
                <td><button onclick="ui.removeExpense(${index})">Remove</button></td>
            `;
            this.expenseList.appendChild(row);
        });
    }

    clearInputs(...inputs) {
        inputs.forEach(input => input.value = '');
    }
}

// Initialize
const budget = new Budget();
const ui = new BudgetUI(budget);