import { lazy } from 'react';


const Login = lazy(() => import('../pages/Login'));
const Page404 = lazy(() => import('../pages/Page404'));

const routes:Record<string,{
    path: string;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
}> = {
  login: {
    path: '/',
    component: Login,
  },
  page404: {
    path: '*',
    component: Page404,
  },
  AddStudents: {
    path: '/add',
    component: lazy(() => import('../pages/AddStudents')),  
  },
  home: {
    path: '/home',
    component: lazy(() => import('../pages/Home')),
  },
  takeaction: {
    path: '/takeaction',
    component: lazy(() => import('../pages/TakeAction')),
  },

};

export default routes;
