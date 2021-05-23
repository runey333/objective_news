import './index.css';
import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
	<div>
		<ul class="nav">
    		<li>
      		<Link to={ROUTES.HOME}>Home</Link>
    		</li>
			<div id="rightFloat">
    			<li>
      			<Link to={ROUTES.ACCOUNT}>Account</Link>
    			</li>
				<li>
					<b>   |   </b>
				</li>
    			<li>
      			<SignOutButton />
    			</li>
			</div>
  		</ul>
	</div>
);

const NavigationNonAuth = () => (
	<div>
  		<ul class="nav">
    		<li>
      		<Link to={ROUTES.LANDING}>Landing</Link>
    		</li>
			<li>
				<b>   |   </b>
			</li>
    		<li>
      		<Link to={ROUTES.SIGN_IN}>Sign In</Link>
    		</li>
  		</ul>
	</div>
);

export default Navigation;
