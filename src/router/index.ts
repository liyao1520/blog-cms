import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getItem } from '@/utils/storage'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: 'users',
        component: () => import('@/views/user/index.vue')
      },
      {
        path: 'comments',
        component: () => import('@/views/comment/index.vue')
      },
      {
        path: 'tags',
        component: () => import('@/views/tag/index.vue')
      },
      {
        path: 'classifies',
        component: () => import('@/views/classify/index.vue')
      },
      {
        path: 'articles_add',
        component: () => import('@/views/article/articles_add.vue')
      },
      {
        path: 'articles_update/:id',
        component: () => import('@/views/article/articles_update.vue')
      },
      {
        path: 'articles',
        component: () => import('@/views/article/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to) => {
  if (!(to.path === '/login')) {
    const token = getItem('token')
    if (!token) return '/login'
  }
})
export default router
