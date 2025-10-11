import App from './App';
import CategoryPosts from './components/CategoryPosts/CategoryPosts';
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
        element: <CategoryPosts />,
      },
    ],
  },
];

export default routes;
