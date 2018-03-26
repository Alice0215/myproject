export default [
  {
    path: '/',
    component: () => import('pages/index')
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
    path: '/partyregister',
    component: () => import('pages/auth/partyregister')
  },
  {
    path: '/project',
    component: () => import('pages/project/add')
  },
  {
    path: '/project/alluser',
    component: () => import('pages/project/all_user')
  },
  {
    path: '/map',
    component: () => import('pages/map')
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
