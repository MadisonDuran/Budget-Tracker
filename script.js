// Budget Data Model Class
class Budget {
    constructor() {
        // Arrays to store income and expense objects
        this.income = [];
        this.expenses = [];
    }

    // Add a new income entry
    addIncome(desc, amount) {
        this.income.push({ desc, amount });
    }

    // Add a new expense entry
    addExpense(desc, amount) {
        this.expenses.push({ desc, amount });
    }

    // Remove an expense by index
    removeExpense(index) {
        this.expenses.splice(index, 1);
    }

    // Reset all income and expenses
    resetAll() {
        this.income = [];
        this.expenses = [];
    }

    // Calculate total income
    getTotalIncome() {
        return this.income.reduce((sum, i) => sum + i.amount, 0);
    }

    // Calculate total expenses
    getTotalExpenses() {
        return this.expenses.reduce((sum, e) => sum + e.amount, 0);
    }

    // Calculate remaining budget
    getBudgetLeft() {
        return this.getTotalIncome() - this.getTotalExpenses();
    }
}


// UI Controller Class
class BudgetUI {
    constructor(budget) {
        this.budget = budget;

        // Get DOM elements for inputs and display
        this.incomeDesc = document.getElementById('income__desc');
        this.incomeAmount = document.getElementById('income__amount');
        this.expenseDesc = document.getElementById('expense__desc');
        this.expenseAmount = document.getElementById('expense-amount');
        this.totalBudget = document.getElementById('total__budget');
        this.totalExpenses = document.getElementById('total__expenses');
        this.budgetLeft = document.getElementById('budget__left');
        this.expenseList = document.getElementById('expense__list');

        // Set up event listeners for buttons
        document.getElementById('add-income').addEventListener('click', () => this.addIncome());
        document.getElementById('add-expense').addEventListener('click', () => this.addExpense());
        document.getElementById('reset__all').addEventListener('click', () => this.resetAll());
    }

    // Handle adding income from UI
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

    // Handle adding expense from UI
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

    // Remove an expense by index and update UI
    removeExpense(index) {
        this.budget.removeExpense(index);
        this.updateUI();
    }

    // Reset all data after confirmation
    resetAll() {
        if (confirm('Are you sure you want to reset everything?')) {
            this.budget.resetAll();
            this.updateUI();
        }
    }

    // Update all UI elements to reflect current data
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

    // Clear input fields
    clearInputs(...inputs) {
        inputs.forEach(input => input.value = '');
    }
}

// App Initialization
const budget = new Budget();
const ui = new BudgetUI(budget);