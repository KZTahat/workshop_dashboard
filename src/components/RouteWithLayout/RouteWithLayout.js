import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProtectedRoute from '../ProtectedRoute';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, protected: ProtectedRoute, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        ProtectedRoute
          ?
          <ProtectedRoute>
            <Layout>
              <Component {...matchProps} />
            </Layout>
          </ProtectedRoute>

          :
          <Layout>
            <Component {...matchProps} />
          </Layout>

      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
