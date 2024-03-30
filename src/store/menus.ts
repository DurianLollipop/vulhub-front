// @src/store/menus.ts
import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useMeanStore =  defineStore('mean', () => {
  // 菜单数据
  const menuList = ref([])
  // 权限数据
  const permList = ref([])
  const hasRoute = ref(false)

  function changeRouteStatus(state: any) {
    hasRoute.value = state
    sessionStorage.setItem("hasRoute", state)
  }

  function setMenuList(menus: any) {
    menuList.value = menus
  }

  function setUserMenuList(admin: boolean) {
    if (admin) {
      menuList.value = [
        {
          path: '/challengeManagement',
          name: 'challengeManagement',
          component: () => import('@/views/ChallengeManagement.vue'),
        },
        {
          path: '/commitManagement',
          name: 'commitManagement',
          component: () => import('@/views/CommitManagement.vue'),
        },
      ]
    } 
  }
  
 function setPermList(authoritys: any) {
    permList.value = authoritys
  }

  return {
    menuList,
    permList,
    hasRoute,
    changeRouteStatus,
    setMenuList,
    setPermList,
    setUserMenuList,
  }
})