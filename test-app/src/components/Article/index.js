import './index.css';
import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';

function Article(props) {
	const [currUserCount, setCurrUserCount] = useState(0);

	const getUrl = () => {
		//console.log(props);
		return props.url;
	}

	const handleClick = (e) => {
		var currUser = props.firebase.auth.currentUser;
		var currUserId = currUser.uid;
		var userRef = props.firebase.db.ref("users/" + currUserId);
		var userListRef = props.firebase.db.ref("users/" + currUserId + "/readList");

		userRef.once("value", (snapshot) => {
    		var userData = snapshot.val();
    		setCurrUserCount(userData["readCount"]);
			console.log(currUserCount);
		});

		userListRef.push(getUrl());
		userRef.update({"readCount": currUserCount + 1});

		if (currUserCount >= 10) {
			userRef.update({"readCount": currUserCount});
			var query = userListRef.orderByKey();
			query.once("value", (snapshot) => {
    				var userData = snapshot.val();
					console.log(userData);
					const keyToRemove = Object.keys(userData)[1];
					console.log("keys: " + Object.keys(userData));
					console.log(keyToRemove);
					userListRef.child(keyToRemove).remove();
			});
		}
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
				<a href={getUrl()} target="_blank" onClick={handleClick}>Read</a>
			</div>
		</div>
	);
}

export default withFirebase(Article);
