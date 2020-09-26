import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
      {/* 2 每一个link通过to属性匹配一个Route路线，Link在页面中会形成一个a标签，
      每点击一个link,都会随之在路由器中渲染一个与其路径匹配的组件 */}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
          <li>
            <Link to='/add'>回到主页</Link>
          </li>
        </ul>

         {/* 1 先确定路由器中的路由线路 */}
        <Switch>
        {/* 每一个Route组件的path属性指定路由路径，内容指定路由到该路径后显示的组件 */}
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path='/add'><HomeButton /></Route>
          <Route path="/">
            <Home />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();
  console.log(match);

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
      {/* topicId为路由参数 */}
        <Route path={`${match.url}/:topicId`}>
          <Topic />
        </Route>
        {/* 当没有选项被选中时，显示下面的内容 */}
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  // 使用useParams获取路由参数
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}


function HomeButton() {
  let history = useHistory();
  console.log(history);
  console.log('location',useLocation())

  function handleClick() {
    history.push("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}