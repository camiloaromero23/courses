import React, { useState } from 'react';

const Card = ({ name, lastName }) => {
	const [toggle, setToggle] = useState(true);
	const [text, setText] = useState('true');

	const toggleHandler = () => {
		setToggle(!toggle);
	};

	const nameHandler = () => {
		setText(text === 'true' ? 'false' : 'true');
	};

	return (
		<div>
			{name},{lastName}
			<div style={{ width: '10vw', height: '10vh' }}>
				{toggle}
				{toggle ? text : ''}
				<br />
				<button onClick={toggleHandler}>Toggle</button>
				<button onClick={nameHandler}>Text</button>
			</div>
		</div>
	);
};
export default Card;
