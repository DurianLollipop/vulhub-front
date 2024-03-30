import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
//路由创建
const constantRouterMap: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'challenge',
    component: () => import('@/views/Challenge.vue'),
  },
  // {
  //   path: '/challengeManagement',
  //   name: 'challengeManagement',
  //   component: () => import('@/views/ChallengeManagement.vue'),
  // },
  // {
  //   path: '/commitManagement',
  //   name: 'commitManagement',
  //   component: () => import('@/views/CommitManagement.vue'),
  // },
  {
    path: '/challengeDetail/:id',
    name: 'challengeDetail',
    component: () => import('@/views/ChallengeDetail.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap,
})
export { router, constantRouterMap }