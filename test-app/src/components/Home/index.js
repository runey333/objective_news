import React from 'react';

import { withAuthorization } from '../Session';
import ArticleGetter from '../ArticleGetter';
import './index.css';

const HomePage = () => (
  <div>
    <h1 id="homePage">Search for Articles</h1>
	 <ArticleGetter/>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
