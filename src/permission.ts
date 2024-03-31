import { router } from "@/router";
import { useMeanStore } from '@/store/menus'
import { useUserStore, UserInfo } from '@/store/user'

//permission.ts 文件 内容
// 路由切换之前触发
// @router/routers.ts 中添加前置路由守卫
router.beforeEach( async (to, _from, next) => {
	next()
	// 注意：在beforeEach中调用pinia存储的菜单状态是为了避免` Did you forget to install pinia?`这个bug
	const useMean = useMeanStore()
	const useUser = useUserStore()
	const cacheUserInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo')); // 仅为示例，实际操作请根据实际情况处理

	if (!useUser.token && cacheUserInfo) {
		useUser.SET_INFO(cacheUserInfo)
	}
	if (!useUser.token) {
	 	const params = new URLSearchParams(window.location.search);
	 	const ticket = params.get('ticket')
		if (!ticket && !localStorage.token) {
			// 单点登录
			window.location.href = import.meta.env.VITE_APP_OOS_URL;
		}
		await useUser.getUserInfo(ticket);
		if (useUser.userInfo.admin) {
			useMean.setUserMenuList(useUser.userInfo.admin)
			useMean.menuList.forEach((route) => {
				router.addRoute(route);
			});
		}
		next()
	} else if (to.path === '/' || to.path === '') {
	  next({path: '/'})
	} else {
		next()
	}
  })

// 路由切换完成后触发
router.afterEach(() => {

})
