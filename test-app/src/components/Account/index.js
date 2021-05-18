import React from 'react';

import { AuthUserContext } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization } from '../Session';
import { useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

function AccountPage(props) {
	const [userSearchList, setUserSearchList] = useState([]);

	var currUser = props.firebase.auth.currentUser;
	var currUserId = currUser.uid;
	var userRef = props.firebase.db.ref("users/" + currUserId);
	var userListRef = props.firebase.db.ref("users/" + currUserId + "/searchList");

	const getList = () => {
		var temp = [];
		var query = userListRef.orderByKey();
		query.once("value").then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
      		var key = childSnapshot.key;
      		var childData = childSnapshot.val();
				if (childData != "dummy") {
					//temp.push(childData);
					temp = userSearchList;
					temp.push(childData);
					setUserSearchList([...temp]);
				}
  			});
		});
		console.log(temp);
		console.log(userSearchList.length);
	}

	useEffect(getList, []);

	const listItems = userSearchList.map((number) =>
  		<li>{number}</li>
	);

	return (
  		<div>
			<AuthUserContext.Consumer>
    		{authUser => (
      		<div>
        			<h1>Account: {authUser.email}</h1>
        			<PasswordForgetForm />
        			<PasswordChangeForm />
      		</div>
    		)}
  			</AuthUserContext.Consumer>
  			<h3> Search History </h3>
  			<ul>{listItems}</ul>
  		</div>
	);
}

const authCondition = authUser => !!authUser;

export default withFirebase(withAuthorization(authCondition)(AccountPage));
