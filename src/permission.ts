import { router } from "@/router";
import { useMeanStore } from '@/store/menus'
import { useUserStore } from '@/store/user'
// import api from '@/api/index'


//permission.ts 文件 内容
// 路由切换之前触发
// @router/routers.ts 中添加前置路由守卫
router.beforeEach((to, _from, next) => {
	next()
	// 注意：在beforeEach中调用pinia存储的菜单状态是为了避免` Did you forget to install pinia?`这个bug
	const useMean = useMeanStore()
	const useUser = useUserStore()
	console.log('hasRoute', useMean.hasRoute)
	if (to.path === '/login') {
	  console.log("login!!!!!!!!!!!")
	  next()
	} else if (!useUser.token) {
	 	const params = new URLSearchParams(window.location.search);
	 	const ticket = params.get('ticket')
		if (!ticket) {
			// 单点登录
			window.location.href = import.meta.env.VITE_APP_OOS_URL;
		}
		// api.login(ticket)
		// .then((res) => {
		// console.log("gggggggggg", res)
		// })
		// .catch((err) => {
		// ElMessage.error('登录失败', err)
		// });
	  	useUser.getUserInfo(ticket)
	  	next({path: "/login"})
	} else if (to.path === '/' || to.path === '') {
	  next({path: '/'})
	} else if (!useMean.hasRoute) {
		console.log('无权限')
		// nav()，菜单查询接口 
	//   nav().then(res => {
	// 	useMean.setMenuList(res.data.nav)
	// 	useMean.setPermList(res.data.authoritys)
	// 	res.data.nav.forEach((menu: { children: any[]; }) => {
	// 	  if (menu.children) {
	// 		menu.children.forEach((e: any) => {
	// 		  if (!e.component) {
	// 			return
	// 		  }
	// 		  const route:any = {
	// 			name: e.name,
	// 			path: e.path,
	// 			meta: {
	// 			  icon: e.icon,
	// 			  title: e.title
	// 			},
	// 			// 用这行部署服务器上跳转会有问题
	// 			component: () =>import(`@/views/${e.component}.vue`)
	// 			// 解决跳转问题
	// 			// component: modules[`../views/${e.component}.vue`]
	// 		  }
	// 		  router.addRoute("Redirect", route)
	// 		})
	// 	  }
	// 	})
	//   })
	//   useMean.changeRouteStatus(true)
	  next({path: to.path})
	} else {
	  console.log("已经有路由了------------")
	  next()
	}
	next()
  })  

// 路由切换完成后触发
router.afterEach(() => {

})
