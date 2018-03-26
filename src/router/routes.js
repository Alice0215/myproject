export default [
  {
    path: '/',
    component: () => import('pages/project/list')
  },
  {
    path: '/login',
    component: () => import('pages/auth/login')
  },
  {
    path: '/register',
    component: () => import('pages/auth/register')
  },
  {
    path: '/partyRegister',
    component: () => import('pages/auth/partyRegister')
  },
  {
    path: '/project/add',
    component: () => import('pages/project/add')
  },
  {
    path: '/project/allUser',
    component: () => import('pages/project/allUser')
  },
  {
    path: '/test',
    component: () => import('pages/test')
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
