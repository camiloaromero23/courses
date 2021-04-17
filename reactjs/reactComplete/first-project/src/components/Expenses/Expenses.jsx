import { useState } from 'react';
import Card from '../UI/Card/Card';
import ExpenseItem from './ExpenseItem';
import './Expenses.css';
import { ExpensesFilter } from './ExpensesFilter';

export default function Expenses({ items }) {
	const [filteredYear, setFilteredYear] = useState('2020');

	const filterChangeHandler = (selectedYear) => {
		setFilteredYear(selectedYear);
	};

	return (
		<div>
			<Card className='expenses'>
				<ExpensesFilter
					onFilterChange={filterChangeHandler}
					selectedYear={filteredYear}
				/>
				<ExpenseItem
					date={items[0].date}
					amount={items[0].amount}
					title={items[0].title}
				/>
				<ExpenseItem
					date={items[1].date}
					amount={items[1].amount}
					title={items[1].title}
				/>
				<ExpenseItem
					date={items[2].date}
					amount={items[2].amount}
					title={items[2].title}
				/>
				<ExpenseItem
					date={items[3].date}
					amount={items[3].amount}
					title={items[3].title}
				/>
			</Card>
		</div>
	);
}
