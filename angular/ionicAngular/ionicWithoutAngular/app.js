const reasonInput = document.querySelector('#inputReason');
const amountInput = document.querySelector('#inputAmount');
const cancelButton = document.querySelector('#buttonCancel');
const confirmButton = document.querySelector('#buttonConfirm');
const expensesList = document.querySelector('#expensesList');
const totalExpenses = document.querySelector('#totalExpenses');

let sum = 0;

const clear = () => {
	reasonInput.value = '';
	amountInput.value = '';
};

confirmButton.addEventListener('click', () => {
	const enteredReason = reasonInput.value;
	const enteredAmount = amountInput.value;

	if (
		enteredReason.trim().length <= 0 ||
		enteredAmount <= 0 ||
		enteredAmount.trim().length <= 0
	) {
		return;
	}
	console.log(enteredReason, enteredAmount);
	const newItem = document.createElement('ion-item');
	newItem.textContent = enteredReason + ': $' + enteredAmount;
	expensesList.appendChild(newItem);
	sum += +enteredAmount;
	totalExpenses.textContent = sum;
	clear();
});

cancelButton.addEventListener('click', clear);
