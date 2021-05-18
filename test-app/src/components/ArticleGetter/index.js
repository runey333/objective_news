import './index.css';
import React, { useState, useEffect } from 'react';
import Article from '../Article';
import { withFirebase } from '../Firebase';

function ArticleGetter(props) { 
	const [articleList, setArticleList] = useState([]);
	const [currKeyword, setCurrKeyword] = useState("");
	const [currUserCount, setCurrUserCount] = useState(0);

	const doStuff = (event) => {
		if (currKeyword !== "") {
			console.log(currKeyword);
			var currUser = props.firebase.auth.currentUser;
			var currUserId = currUser.uid;
			
			var userRef = props.firebase.db.ref("users/" + currUserId);
			var userListRef = props.firebase.db.ref("users/" + currUserId + "/searchList");

			userRef.once("value", (snapshot) => {
    			var userData = snapshot.val();
    			setCurrUserCount(userData["searchCount"]);
				console.log(currUserCount);
			});

			userListRef.push(currKeyword);
			userRef.update({"searchCount": currUserCount + 1});

			if (currUserCount >= 10) {
				userRef.update({"searchCount": currUserCount});
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

			fetch("/getArticles/" + currKeyword)
  				.then(response => response.json())
  				.then(data => updateState(data));
			
		}
	}

	const updateState = (newStateVar) => {
		console.log("updating");
		console.log(newStateVar);
		const arr = [];
		const keys = Object.keys(newStateVar);
		for (var i = 0; i < keys.length; i++) {
			const data = [];
			data.push(keys[i]);
			data.push(newStateVar[keys[i]]["url"]);
			//console.log(newStateVar[keys[i]]["url"]);

			if (newStateVar[keys[i]].hasOwnProperty("image")) {
				data.push(newStateVar[keys[i]]["image"]["thumbnail"]["contentUrl"]); 
				console.log(newStateVar[keys[i]]["image"]["thumbnail"]["contentUrl"]);
			} else {
				data.push("");
			}

			if (newStateVar[keys[i]].hasOwnProperty("description")) {
				data.push(newStateVar[keys[i]]["description"]); 
			} else {
				data.push("");
			}
			
			data.push(newStateVar[keys[i]]["provider"][0]["name"]);
			data.push(newStateVar[keys[i]]["datePublished"].substring(0, 10));
			data.push(newStateVar[keys[i]]["datePublished"].substring(11, 19));
			//console.log(newStateVar[keys[i]]["provider"]["name"]);
			
			arr.push(data);
		}
		
		setArticleList(arr);
		console.log(arr);
	}

	const updateCurrKey = (event) => {
		setCurrKeyword(event.target.value);
		console.log(currKeyword);
	}

	return (
		<div className="App">
			<form>
				<input id="keywordInputBox" type="text" name="keyword" value={currKeyword} onChange={updateCurrKey}/>
         	<input type="button" value="Get Articles" onClick={doStuff}/>
			</form>
      	<div id="all_articles">
				{articleList.map((article) => (
        			<Article src={article[2]} name={article[0]} description={article[3]} url={article[1]} provider={article[4]} date={article[5]} time={article[6]}/>
      		))}
			</div>
		</div>
	);	
}

export default withFirebase(ArticleGetter);
