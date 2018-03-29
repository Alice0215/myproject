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
    path: '/logout'
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
    path: '/project/edit',
    component: () => import('pages/project/edit')
  },
  {
    path: '/project/allUser',
    component: () => import('pages/project/allUser')
  },
  {
    path: '/qcode/list',
    component: () => import('pages/qcode/list')
  },
  {
    path: '/qcode/add',
    component: () => import('pages/qcode/add')
  },
  {
    path: '/qcode/detail',
    component: () => import('pages/qcode/detail')
  },
  {
    path: '/qcode/edit',
    component: () => import('pages/qcode/edit')
  },
  {
    path: '/project/map',
    component: () => import('pages/project/map')
  },
  {
    path: '/project/maintenance',
    component: () => import('pages/project/constructionMaintenance.vue')
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
