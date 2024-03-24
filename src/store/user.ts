// @src/store/user.ts
import { defineStore } from 'pinia'
import api from '@/api/index'
import { ref } from 'vue';

interface UserInfo {
  userName: string;
  empNo: string;
  token: string;
}

export const useUserStore = defineStore('user', () => {
  const token = ref("")
  //定义管理用户数据的state
  const userInfo = ref({})
  // 定义获取接口数据的action函数
  const getUserInfo = async (ticket: string) => {
    api.login(ticket)
    .then((res) => {
      console.log("sssssssss", res)
      if (res.data.data && res.data.code === 200) {
        userInfo.value = res.data.data
        token.value = res.data.data.token
        localStorage.setItem("token", res.data.data.token);
      }
    })
    .catch((err) => {
      ElMessage.error('登录失败', err)
    });
  }
  // 退出时清除用户信息
  const clearUserInfo = () => {
      userInfo.value = {}
  }

  function SET_TOKEN(name: string) {
    token.value = name
    localStorage.setItem("token", name)
  }

  /**
   * 更新用户信息
   * @param user 用户信息对象，包含用户的详细信息
   * 该函数没有返回值
   */
  function SET_INFO(user: UserInfo) {
    userInfo.value = user // 更新全局的userInfo变量为新的用户信息
  }
  
  async function remove() {
    await api.logout()
    localStorage.clear()
    sessionStorage.clear()
    SET_INFO({} as UserInfo)
  }
  
  return {
    persist: true,
    token,
    userInfo,
    remove,
    SET_TOKEN,
    SET_INFO,
    getUserInfo,
    clearUserInfo
  }
})
