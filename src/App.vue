<template>
	<el-config-provider :locale="locale" name="el" :message="config">
		<el-container>
      <el-header style="padding: 0;">
        <el-row>
          <el-col :span="12" style="line-height:100%;  color: white;" >
            <el-row style="background-color: #545c64;margin-top: -2px;border-bottom: solid 1px var(--el-menu-border-color);">
              <el-col :span="6" class="title" style="flex: 0 0;">
                <img style="width: 40px; padding: 8px 0 0 5px;" src="@/assets/yeelow.png" />
              </el-col>
              <el-col :span="18">
                <el-row style="padding-top: 12px;">
                  <el-col class="title">
                    安全漏洞实战训练场
                  </el-col>
                  <el-col style="font-size: xx-small;">
                    Information Security Vulnerability Platform
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect" :router="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <div class="flex-grow"/>
              <el-menu-item index="/">漏洞标靶</el-menu-item>
              <template v-if="userStore.userInfo.admin">
                <el-menu-item index="/challengeManagement">挑战管理</el-menu-item>
                <el-menu-item index="/commitManagement">解答提交管理</el-menu-item>
              </template>
                <el-avatar class="margin-top-12" :src="avatarUrl" />
                <template v-if="userStore.userInfo.token">
                  <el-button class="ml-5" link @click="logout" style="color: aliceblue;margin-right: 10px;">退出</el-button>
                </template>
            </el-menu>
          </el-col>
        </el-row>
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
.title {
 text-align: left;
 font-size: 18px;
 padding-bottom: 7px
;
 font-family: simsun;
}

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