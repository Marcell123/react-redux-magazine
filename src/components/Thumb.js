import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


const Thumb = (props) => {
	return(
		<div className="thumb">
			<img src={props.src} alt={props.title}/>
		</div>
	);
}

export default Thumb;