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
                    Security Vulnerability Training Ground
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
                <el-menu-item index="/statistics">数据统计</el-menu-item>
              </template>
              <el-menu-item>
                    <el-button class="ml-5" link @click="downManualDoc" style="color: aliceblue;margin-right: 10px; width: 100%;">操作手册</el-button>
                  </el-menu-item>
              <el-sub-menu index="2">
                <template #title>
                  <el-avatar class="margin-top-12" :src="avatarUrl" />
                </template>
                <template v-if="userStore.userInfo.token" >
                  <!-- <el-menu-item>
                    <el-button class="ml-5" link @click="downManualDoc" style="color: aliceblue;margin-right: 10px; width: 100%;">操作手册</el-button>
                  </el-menu-item> -->
                </template>
                <el-menu-item>
                  <el-button class="ml-5" link @click="logout" style="color: aliceblue;margin-right: 10px; width: 100%;">退出</el-button>
                </el-menu-item>
              </el-sub-menu>
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
import api from '@/api/index'


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

const downManualDoc = () => {
  //  window.location.href = `${import.meta.env.VITE_APP_API_URL}/doc/manual.docx`;
  api.getmanual()
  .then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=binary'}));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `manual.docx`);
    document.body.appendChild(link);
    link.click();
  })
 .catch()
}

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

.el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
  min-width: 100px!important;
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