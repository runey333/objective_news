import './index.css';
import React, { useState, useEffect } from 'react';

function Article(props) {
	const getUrl = () => {
		//console.log(props);
		return props.url;
	}

	return (
		<div className="article">
			<div className="img_div">
				<img src={props.src} alt="article image" width="100" height="100"/>
			</div>
			<div className="data_div">
				<p><b>{props.name}</b></p>
				<p><i>{props.provider}  --  {props.date}, {props.time}</i></p>
				<p>{props.description.concat("...")}</p>
				<a href={getUrl()} target="_blank">Read</a>
			</div>
		</div>
	)
}

export default Article;
