import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
	return (
		<div className={classes.BuildControls}>
			<p>
				Current price: <strong>{props.price.toFixed(2)}</strong>
			</p>
			{controls.map((control) => {
				return (
					<BuildControl
						added={() => props.ingredientAdded(control.type)}
						removed={() => props.ingredientRemoved(control.type)}
						key={control.label}
						label={control.label}
						disabled={props.disabled[control.type]}
					/>
				);
			})}
			<button
				disabled={!props.purchaseable}
				className={classes.OrderButton}
				onClick={props.purchasing}
			>
				ORDER NOW
			</button>
		</div>
	);
};

export default BuildControls;
