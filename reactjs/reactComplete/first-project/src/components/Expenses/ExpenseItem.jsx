import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card/Card';

import './ExpenseItem.css';

export default function ExpenseItem(props) {
	const { date, amount, title } = props;
	const month = date.toLocaleString('en-US', { month: 'long' });
	const day = date.toLocaleString('en-US', { day: '2-digit' });
	const year = date.getFullYear();

	return (
		<Card className='expense-item'>
			<ExpenseDate month={month} day={day} year={year} />
			<div className='expense-item__description'>
				<h2>{title}</h2>
				<div className='expense-item__price'>{amount}</div>
			</div>
		</Card>
	);
}
