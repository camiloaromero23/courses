import React from 'react';
import Card from './components/Card';
import './App.css';

const App = () => {
	return (
		<div style={{ color: 'blue' }}>
			<Card name="al" lastName="al" />
			<Card name="el" lastName="el" />
			<Card name="il" lastName="il" />
		</div>
	);
};

export default App;
