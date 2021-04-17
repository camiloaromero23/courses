import './ExpensesFilter.css';

export function ExpensesFilter(props) {
	const { onFilterChange, selectedYear } = props;
	const dropdownChangeHandler = ({ target }) => {
		onFilterChange(target.value);
	};

	return (
		<div className='expenses-filter'>
			<div className='expenses-filter__control'>
				<label>Filter by filteredYear</label>
				<select onChange={dropdownChangeHandler} value={selectedYear}>
					<option value='2022'>2022</option>
					<option value='2021'>2021</option>
					<option value='2020'>2020</option>
					<option value='2019'>2019</option>
				</select>
			</div>
		</div>
	);
}
