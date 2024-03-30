import { defineStore } from 'pinia'
import { constantRouterMap } from '@/router'
import Layout from '@/layout/index.vue'
const modules = import.meta.glob('@/views/**/**.vue')

export const filterAsyncRoutes = (routerList) => {
    //进行递归解析
    //routerList 后端获取的路由
    const res = []
    routerList.forEach(e => {
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
            e_new.component = modules[`/src/views${e.url}/index.vue`]
        }
        if (e.children && e.children!=null) {
        }

        res.push(e_new)
    })
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
            let routerList = JSON.parse(JSON.stringify(routes))
            return new Promise((resolve) => {
                
                const accessedRoutes = filterAsyncRoutes(routerList)
                this.addRoutes = accessedRoutes
                this.routes = constantRouterMap.concat(accessedRoutes)
                resolve(accessedRoutes)
            })

        }
    }
})
