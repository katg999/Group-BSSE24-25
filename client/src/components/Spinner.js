import React from 'react';

const Spinner = () => {
	return (
		<div className='spinner'>
			<div className='spinner-border' role='status' aria-hidden='true'></div>
			<span className='visually-hidden'>Loading...</span>
		</div>
	);
};

export default Spinner;
