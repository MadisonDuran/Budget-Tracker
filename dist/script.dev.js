"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Budget =
/*#__PURE__*/
function () {
  function Budget() {
    _classCallCheck(this, Budget);

    this.income = [];
    this.expenses = [];
  }

  _createClass(Budget, [{
    key: "addIncome",
    value: function addIncome(desc, amount) {
      this.income.push({
        desc: desc,
        amount: amount
      });
    }
  }, {
    key: "addExpense",
    value: function addExpense(desc, amount) {
      this.expenses.push({
        desc: desc,
        amount: amount
      });
    }
  }, {
    key: "removeExpense",
    value: function removeExpense(index) {
      this.expenses.splice(index, 1);
    }
  }, {
    key: "resetAll",
    value: function resetAll() {
      this.income = [];
      this.expenses = [];
    }
  }, {
    key: "getTotalIncome",
    value: function getTotalIncome() {
      return this.income.reduce(function (sum, i) {
        return sum + i.amount;
      }, 0);
    }
  }, {
    key: "getTotalExpenses",
    value: function getTotalExpenses() {
      return this.expenses.reduce(function (sum, e) {
        return sum + e.amount;
      }, 0);
    }
  }, {
    key: "getBudgetLeft",
    value: function getBudgetLeft() {
      return this.getTotalIncome() - this.getTotalExpenses();
    }
  }]);

  return Budget;
}();

var BudgetUI =
/*#__PURE__*/
function () {
  function BudgetUI(budget) {
    var _this = this;

    _classCallCheck(this, BudgetUI);

    this.budget = budget; //DOM Elements

    this.incomeDesc = document.getElementById('income-desc');
    this.incomeAmount = document.getElementById('income-amount');
    this.expenseDesc = document.getElementById('expense-desc');
    this.expenseAmount = document.getElementById('expense-amount');
    this.totalBudget = document.getElementById('total-budget');
    this.totalExpenses = document.getElementById('total-expenses');
    this.budgetLeft = document.getElementById('budget-left');
    this.expenseList = document.getElementById('expense-list'); // Event Listeners

    document.getElementById('add-income').addEventListener('click', function () {
      return _this.addIncome();
    });
    document.getElementById('add-expense').addEventListener('click', function () {
      return _this.addExpense();
    });
    document.getElementById('reset-all').addEventListener('click', function () {
      return _this.resetAll();
    });
  }

  _createClass(BudgetUI, [{
    key: "addIncome",
    value: function addIncome() {
      var desc = this.incomeDesc.value.trim();
      var amount = parseFloat(this.incomeAmount.value);

      if (desc && amount > 0) {
        this.budget.addIncome(desc, amount);
        this.updateUI();
        this.clearInputs(this.incomeDesc, this.incomeAmount);
      } else {
        alert('Enter a valid income description and amount.');
      }
    }
  }, {
    key: "addExpense",
    value: function addExpense() {
      var desc = this.expenseDesc.value.trim();
      var amount = parseFloat(this.expenseAmount.value);

      if (desc && amount > 0) {
        this.budget.addExpense(desc, amount);
        this.updateUI();
        this.clearInputs(this.expenseDesc, this.expenseAmount);
      } else {
        alert('Enter a valid expense description and amount');
      }
    }
  }, {
    key: "removeExpense",
    value: function removeExpense(index) {
      this.budget.removeExpense(index);
      this.updateUI();
    }
  }, {
    key: "resetAll",
    value: function resetAll() {
      if (confirm('Are you sure you want to reset everything?')) {
        this.budget.resetAll();
        this.updateUI();
      }
    }
  }, {
    key: "updateUI",
    value: function updateUI() {
      var _this2 = this;

      this.totalBudget.textContent = this.budget.getTotalIncome().toFixed(2);
      this.totalExpenses.textContent = this.budget.getTotalExpenses().toFixed(2);
      this.budgetLeft.textContent = this.budget.getBudgetLeft().toFixed(2); // Update expense table

      this.expenseList.innerHTML = '';
      this.budget.expenses.forEach(function (exp, index) {
        var row = document.createElement('tr');
        row.innerHTML = "\n            <td>".concat(exp.desc, "</td>\n            <td>").concat(exp.amount.toFixed(2), "</td>\n            <td><button onclick=\"ui.removeExpense(").concat(index, ")\">Remove</button></td>\n        ");

        _this2.expenseList.appendChild(row);
      });
    }
  }, {
    key: "clearInputs",
    value: function clearInputs() {
      for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
        inputs[_key] = arguments[_key];
      }

      inputs.forEach(function (input) {
        return input.value = '';
      });
    }
  }]);

  return BudgetUI;
}(); // Initialize


var budget = new Budget();
var ui = new BudgetUI(budget);