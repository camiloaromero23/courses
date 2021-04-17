import { useState } from 'react';
import './ExpenseForm.css';

export default function ExpenseForm({ onSaveExpenseData }) {
	// const [title, setTitle] = useState('');
	// const [amount, setAmount] = useState('');
	// const [date, setDate] = useState( '' );
	const [expenseData, setExpenseData] = useState({
		title: '',
		amount: '',
		date: '',
	});

	const titleChangeHandler = ({ target }) => {
		setExpenseData((prevState) => {
			return {
				...prevState,
				title: target.value,
			};
		});
	};
	const amountChangeHandler = ({ target }) => {
		setExpenseData((prevState) => {
			return {
				...prevState,
				amount: target.value,
			};
		});
	};
	const dateChangeHandler = ({ target }) => {
		setExpenseData((prevState) => {
			return {
				...prevState,
				date: target.value,
			};
		});
	};

	const submitHandler = (event) => {
		event.preventDefault();
		onSaveExpenseData(expenseData);
		setExpenseData({
			title: '',
			amount: '',
			date: '',
		});
	};

	return (
		<form onSubmit={submitHandler}>
			<div className='new-expense__controls'>
				<div className='new-expense__control'>
					<label>Title</label>
					<input
						type='text'
						onChange={titleChangeHandler}
						value={expenseData.title}
					/>
				</div>
				<div className='new-expense__control'>
					<label>Amount</label>
					<input
						type='number'
						min='0.01'
						step='0.01'
						onChange={amountChangeHandler}
						value={expenseData.amount}
					/>
				</div>
				<div className='new-expense__control'>
					<label>Date</label>
					<input
						type='date'
						min='2019-01-01'
						max='2022-12-31'
						onChange={dateChangeHandler}
						value={expenseData.date}
					/>
				</div>
			</div>
			<div className='new-expense__actions'>
				<button type='submit'>Add Expense</button>
			</div>
		</form>
	);
}
