import { defineStore } from 'pinia'
import { constantRouterMap } from '@/router'
import Layout from '@/layout/index.vue'
const modules = import.meta.glob('@/views/**/**.vue')

// console.log(modules);
export const filterAsyncRoutes = (routerList) => {
    //进行递归解析
    //routerList 后端获取的路由
    const res = []
    // console.log(testData);
    routerList.forEach(e => {
        // console.log(e.component);
        let e_new = {
            path: e.url,
            name: e.menuName,
            meta: {
                title: e.menuName,
                icon: e.icon
            },
             component: null

        }
        if (e.menuType === 'M') {
            e_new.component = Layout
        }else {
            // console.log("22222",e.url);
            e_new.component = modules[`/src/views${e.url}/index.vue`]
        }
        // console.log(e_new);
        if (e.children && e.children!=null) {
            // const children = filterAsyncRoutes(e.children)
            // 保存权限
            // e_new = { ...e_new, children: children }
        }

        res.push(e_new)
    })
    // console.vlog("111",res);
    return res
}

export const usePermissionStore = defineStore('permission', {
     // id必填，且需要唯一
    state: () => {
        return {
            routes: [],//全部路由
            addRoutes: []//后端增加的路由
        }
    },
    actions: {
        generateRoutes(routes) {
            // console.log(routes);
            let routerList = JSON.parse(JSON.stringify(routes))
            // console.log(routerList);
            return new Promise((resolve) => {
                
                const accessedRoutes = filterAsyncRoutes(routerList)
                // console.log(accessedRoutes);
                this.addRoutes = accessedRoutes
                // console.log("111",accessedRoutes);
                this.routes = constantRouterMap.concat(accessedRoutes)
                resolve(accessedRoutes)
            })

        }
    }
})
