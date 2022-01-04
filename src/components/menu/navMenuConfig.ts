export default [
  {
    name: '用户管理',
    path: '/users'
  },
  {
    name: '博客文章管理',
    items: [
      {
        name: '发表文章',
        path: '/articles_add'
      },
      {
        name: '文章管理',
        path: '/articles'
      }
    ]
  },
  {
    name: '博客评论管理',
    items: [
      {
        name: '评论管理',
        path: '/comments'
      }
    ]
  },
  {
    name: '博客分类管理',
    path: '/classifies'
  },
  {
    name: '博客标签管理',
    path: '/tags'
  },
  {
    name: 'Markdown管理',
    path: '/md'
  }
]
