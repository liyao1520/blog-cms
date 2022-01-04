import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getItem } from '@/utils/storage'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/index.vue')
      },
      {
        path: 'users',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'comments',
        component: () => import('@/views/comment/index.vue'),
        meta: {
          title: '评论管理'
        }
      },
      {
        path: 'tags',
        component: () => import('@/views/tag/index.vue'),
        meta: {
          title: '标签管理'
        }
      },
      {
        path: 'classifies',
        component: () => import('@/views/classify/index.vue'),
        meta: {
          title: '分类管理'
        }
      },
      {
        path: 'articles_add',
        component: () => import('@/views/article/articles_add.vue'),
        meta: {
          title: '新增文章'
        }
      },
      {
        path: 'articles_update/:id',
        component: () => import('@/views/article/articles_update.vue'),
        meta: {
          title: '更新文章'
        }
      },
      {
        path: 'articles',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '文章管理'
        }
      },
      {
        path: 'md',
        component: () => import('@/views/my_md/index.vue'),
        meta: {
          title: 'Markdowm管理'
        }
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
