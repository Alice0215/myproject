import ProjectList from '../pages/project/list'
import ProjectInfo from '../pages/project/ProjectInfo'
export default [
  {
    path: '/',
    component: () => import('pages/home/home')
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
    path: '/project/list',
    component: ProjectList
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
    path: '/ProjectInfo',
    component: ProjectInfo
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
    path: '/jobGroup/record',
    component: () => import('pages/jobGroup/record'),
    name: 'jobRecord'
  },
  {
    path: '/jobGroup/groupRecord',
    component: () => import('pages/jobGroup/groupRecord'),
    name: 'jobGroupRecord'
  },
  {
    path: '/jobGroup/detail',
    component: () => import('pages/jobGroup/detail'),
    name: 'jobDetail'
  },
  {
    path: '/project/maintenance',
    component: () => import('pages/project/constructionMaintenance.vue')
  },
  {
    path: '/project/jobs',
    component: () => import('pages/project/jobs.vue')
  },
  {
    path: '/choose/project',
    component: () => import('pages/choose/chooseProject.vue')
  },
  {
    path: '/choose/qrtype',
    component: () => import('pages/choose/chooseQRType.vue')
  },
  {
    path: '/qcode/scan',
    component: () => import('pages/qcode/scan.vue')
  },
  {
    path: '/qcode/view',
    component: () => import('pages/qcode/viewQRCode.vue')
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
