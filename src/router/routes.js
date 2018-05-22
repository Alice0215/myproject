import Home from '../pages/home/home'
import ProjectList from '../pages/project/list'
import ProjectInfo from '../pages/project/ProjectInfo'
import Records from '../pages/project/Records'
import ProjectDetail from '../pages/project/ProjectDetail'
import Admin from '../pages/admin/Admin'
import MaintenanceDetail from '../pages/jobgroup/detail'

import areaDetail from '../pages/qcode/areaDetail'

import chooseDate from '../pages/choose/chooseDate'

import QrCodeDetail from '../pages/QrCode/QrCodeDetail'
import QrAreaSingleDetail from '../pages/QrCode/Information/QrAreaSingleInfo'

export default [
  {
    path: '/',
    component: Home
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
    path: '/projectDetail',
    component: ProjectDetail
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
    component: QrCodeDetail,
    name: 'qcodeDetail'
  },
  {
    path: '/areaDetail',
    component: QrAreaSingleDetail
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
    path: '/jobGroup/detail',
    component: MaintenanceDetail,
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
    path: '/project/maintenance-records',
    component: Records
  },
  {
    path: '/admin',
    component: Admin
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
    path: '/chooseDate',
    component: chooseDate
  },
  {
    path: '/qcode/scan',
    component: () => import('pages/qcode/scan.vue')
  },
  {
    path: '/qcode/view',
    component: () => import('pages/qcode/viewQRCode.vue')
  },
  {
    path: '/qrcode/chooseType',
    component: () => import('pages/choose/chooseQRType.vue')
  },
  {
    path: '/qrcode/stepper',
    component: () => import('pages/qcode/stepperPlant.vue')
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
