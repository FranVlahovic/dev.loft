import App from './App';
import Home from './components/Home/Home';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/:slug/posts',
        element: <Home />,
      },
    ],
  },
];

export default routes;
