import React from "react";
import {
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";

import Topic from './topic'

function Topics() {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { path, url } = useRouteMatch();
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
          {/* 注意这里包围用的不是单引号，而是用于包围代码段的`` */}
            <Link to={`${url}/rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>
  
        <Switch>
          <Route exact path={path}>
            <h3>Please select a topic.</h3>
          </Route>
          <Route path={`${path}/:topicId`}>
            <Topic />
          </Route>
        </Switch>
      </div>
    );
  }

  export default Topics