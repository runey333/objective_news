import React from 'react';

import { withAuthorization } from '../Session';
import ArticleGetter from '../ArticleGetter';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
	 <ArticleGetter/>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
