// @src/store/user.ts
import { defineStore } from 'pinia'
import api from '@/api/index'
import { ref } from 'vue';

export interface UserInfo {
  userId: string;
  userName: string;
  empNo: string;
  token: string;
  admin: boolean;
}

export const useUserStore = defineStore('user', () => {
  const token = ref("")
  //定义管理用户数据的state
  const userInfo = ref<UserInfo>({
    userId: '', // 初始化值
    userName: '',
    empNo: '',
    token: '',
    admin: false,
  });
  // 设置用户信息
  function SET_TOKEN(name: string) {
    token.value = name
    localStorage.setItem("token", name)
  }
  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = null;
    localStorage.setItem("token", null)
  }

  /**
   * 更新用户信息
   * @param user 用户信息对象，包含用户的详细信息
   * 该函数没有返回值
   */
  function SET_INFO(user: UserInfo) {
    token.value = user.token
    localStorage.setItem("token", user.token)
    userInfo.value = user // 更新全局的userInfo变量为新的用户信息
  }

  async function remove() {
    localStorage.clear()
    sessionStorage.clear()
    SET_INFO({} as UserInfo)
    // 单点退出
    window.location.href = import.meta.env.VITE_APP_OOS_LOGOUT_URL
  }

  // 定义获取接口数据的action函数
  const getUserInfo = async (ticket: string) => {
    const res = await api.login(ticket)
		if (res.data.data && res.data.code === "200") {
			userInfo.value.admin = res.data.data.admin
			userInfo.value.empNo = res.data.data.empNo
			userInfo.value.token = res.data.data.token
			userInfo.value.userName = res.data.data.userName
			userInfo.value.admin = res.data.data.admin
			userInfo.value.userId = res.data.data.userId
			SET_TOKEN(res.data.data.token)
      localStorage.setItem("userInfo", JSON.stringify(userInfo.value))
		} else {
      remove();
		  ElMessage.error('登录失败3')
		}
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
