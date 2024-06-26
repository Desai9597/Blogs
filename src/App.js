import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
//import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
//import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

//lazy loading the Blog component also.
//But for that , we need to wrap the import promise by lazy function
//lazy is executed, and takes this function as an argument
const BlogPage = lazy(() => import('./pages/Blog'));

const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          /*{  index: true, element: <BlogPage />, loader: postsLoader }*/
          //async import statement returns back a promise.
          //lazy loading takes time, so we wrap it by Suspense,
          //to wait for the content to be loading before actually rendering
          {  
            index: true, 
            element: <Suspense fallback={<p>Loaing..</p>}><BlogPage /></Suspense>, 
            loader: () => 
              import('./pages/Blog').then(module => module.loader()) 
          },
          { 
            path: ':id', 
            element: <Suspense fallback={<p>Loaing..</p>}><PostPage /></Suspense>, 
            loader: (meta) =>
              import('./pages/Post').then((module) => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
