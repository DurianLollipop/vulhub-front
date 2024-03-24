<template>
	<el-config-provider :locale="locale" name="el" :message="config">
		<el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect" :router="true">
          <el-menu-item index="0">
            <img style="width: 100px" src="@/assets/element-plus-logo.svg" alt="Element logo" />
          </el-menu-item>
          <div class="flex-grow"/>
          <el-menu-item index="/">漏洞标靶</el-menu-item>
          <el-menu-item index="/challengeManagement">挑战管理</el-menu-item>
          <el-menu-item index="/commitManagement">解答提交管理</el-menu-item>
          <el-menu-item index="4">
            <el-avatar src="https://picsum.photos/200" />
          </el-menu-item>
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

const activeIndex = ref('')

const route = useRoute()
watchEffect(() => {
  activeIndex.value = route.path 
})


const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const locale = zhCn;

// 然后将element-ui中pagination选项改掉
zhCn.el.pagination = {
	pagesize: '条/页',
	total: `共 {total} 条`,
	goto: '前往第',
	pageClassifier: '页',
};

const config = reactive({
	max: 4,
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

.ml-2 {
  margin-left: 5px;
}</style>