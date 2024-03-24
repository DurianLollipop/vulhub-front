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
 function setPermList(authoritys: any) {
    permList.value = authoritys
  }
  return {
    menuList,
    permList,
    hasRoute,
    changeRouteStatus,
    setMenuList,
    setPermList
  }
})