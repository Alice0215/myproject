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
    component: () => import('pages/project/add'),
    name: 'projectAdd'
  },
  {
    path: '/project/edit',
    component: () => import('pages/project/edit'),
    name: 'projectEdit'
  },
  {
    path: '/project/allUser',
    component: () => import('pages/project/allUser'),
    name: 'allUser'
  },
  {
    path: '/project/userList',
    component: () => import('pages/project/userList'),
    name: 'projectUserList'
  },
  {
    path: '/qcode/list',
    component: () => import('pages/qcode/list'),
    name: 'qcodeList'
  },
  {
    path: '/qcode/add',
    component: () => import('pages/qcode/add'),
    name: 'qcodeAdd'
  },
  {
    path: '/qcode/detail',
    component: () => import('pages/qcode/detail'),
    name: 'qcodeDetail'
  },
  {
    path: '/qcode/addPlant',
    component: () => import('pages/qcode/addPlant'),
    name: 'qcodeAddPlant'
  },
  {
    path: '/qcode/edit',
    component: () => import('pages/qcode/edit'),
    name: 'qcodeEdit'
  },
  {
    path: '/project/map',
    component: () => import('pages/project/map')
  },
  {
    path: '/jobGroup/byUser',
    component: () => import('pages/jobGroup/byUser'),
    name: 'groupByUser'
  },
  {
    path: '/project/maintenance',
    component: () => import('pages/project/constructionMaintenance.vue')
  },
  {
    path: '/choose/project',
    component: () => import('pages/choose/chooseProject.vue')
  },
  {
    path: '/qcode/scan',
    component: () => import('pages/qcode/scan.vue')
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
