import './ExpenseDate.css';

export default function ExpenseDate(props) {
	const { month, year, day } = props;
	return (
		<div className='expense-date'>
			<div className='expense-date__month'>{month}</div>
			<div className='expense-date__year'>{year}</div>
			<div className='expense-date__day'>{day}</div>
		</div>
	);
}
