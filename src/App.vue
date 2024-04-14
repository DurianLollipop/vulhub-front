<template>
	<el-config-provider :locale="locale" name="el" :message="config">
		<el-container>
      <el-header style="padding: 0;">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect" :router="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="0" style="padding-top: 8px; line-height:100%">
            <img style="width: 50px;" src="@/assets/blue.png" />
            <el-row>
              <el-col>
                信息安全漏洞平台
              </el-col>
              <el-col style="font-size: xx-small;">
                Information Security Vulnerability Platform
              </el-col>
            </el-row>
          </el-menu-item>
          <div class="flex-grow"/>
          <el-menu-item index="/">漏洞标靶</el-menu-item>
          <template v-if="userStore.userInfo.admin">
            <el-menu-item index="/challengeManagement">挑战管理</el-menu-item>
            <el-menu-item index="/commitManagement">解答提交管理</el-menu-item>
          </template>
          <!-- <el-menu-item index="4"> -->
            <el-avatar class="margin-top-12" :src="avatarUrl" />
            <template v-if="userStore.userInfo.token">
              <el-button class="ml-5" link @click="logout" style="color: aliceblue;">退出</el-button>
            </template>
          <!-- </el-menu-item> -->
        </el-menu>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer>
        
      </el-footer>
    </el-container>
		</el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store/user'

const activeIndex = ref('')
const userStore = useUserStore()

const handleSelect = (_key: string, _keyPath: string[]) => {
  
}

const logout = () => {
  userStore.remove()
}

const route = useRoute()
watchEffect(() => {
  if(route.path.includes('/challengeDetail/')) {
    activeIndex.value = '/' 
  } else {
    activeIndex.value = route.path 
  }
})

// 创建一个计算属性来生成头像的完整 URL
const avatarUrl = computed(() => `http://172.26.1.1:1040/avatar/${userStore.userInfo.empNo}.jpg`);

const locale = zhCn;

// 然后将element-ui中pagination选项改掉
zhCn.el.pagination = {
	pagesize: '条/页',
	total: `共 {total} 条`,
	goto: '前往第',
	pageClassifier: '页',
};

const config = reactive({
	max: 3,
});
</script>

<style>
.flex-grow {
  flex-grow: 1;
}

.margin-left-12 {
  margin-left: 12px;
}

.margin-top-12 {
  margin-top: 12px;
}

.ml-5 {
  margin-left: 5px;
}</style>