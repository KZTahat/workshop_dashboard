import React from 'react'
import cookie from 'react-cookies'
import { useHistory } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const { component, ...rest } = props;
    const isAuthenticated = cookie.load('token');
    const history = useHistory();

    return (
        <div>
            {isAuthenticated ? < div {...rest} ></div> : history.push('./sign-in')}
        </div>
    )
}

export default ProtectedRoute;