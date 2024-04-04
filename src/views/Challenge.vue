<template>
  <el-row style="height: 750px;overflow: auto;">
    <el-col :span="3"></el-col>
    <el-col :span="18">
      <el-row :v-show="contentShow" style="height: 100%;" v-infinite-scroll="loadMore" :infinite-scroll-disabled="scrollDisabled" infinite-scroll-distance="10">
        <el-col
          v-for="(data, index) in tableData"
          :key="data.id"
          :span="5"
          :offset="index%4 > 0 ? 1 : 0"
          class="margin-top-2"
        >
        <el-card @click="gotoChallenge(data.id)" shadow="always" class="margin-top-28 card-color" >
          <template #header>
            <div class="card-header">
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="data.name"
                placement="top-start"
              >
              <p style="width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ data.name }}</p>
              </el-tooltip>
            </div>
          </template>
          <div>
            <img src="@/assets/info.png" class="image" />
          </div>
          <template #footer>{{ formatOpenStatus(data.openStatus) }}</template>
        </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="3"></el-col>
  </el-row>
  
</template>


<script lang="ts" setup>
import {useRouter } from 'vue-router'
import api from '@/api/index'
const tableData = ref<ChallengeInfo[]>([])
// 当前页数
const currentPage = ref(1);
// 每页条数
const pageSize = 8;
const scrollDisabled = ref(true);
const contentShow = ref(true);
const infiniteMsgShow = ref(false);

const router = useRouter()

const gotoChallenge = (challengeId: number) => {
  router.push({
        name: 'challengeDetail',
        params: {id: challengeId}

    })
}

const loadData = (params: object) => {
  const request = {
    "params": params
  }
  api.getChallenges(request)
  .then(result => {
      const listTotal = result.data.totalCount
      if (listTotal > 0) {
        contentShow.value = true
      } else {
        contentShow.value = false
      }
      tableData.value = tableData.value.concat(result.data.data)
      const DownloadTotal = (currentPage.value + 1) * pageSize
      if (DownloadTotal >= result.data.totalCount) {
        scrollDisabled.value = true // 将无限滚动关闭
        currentPage.value = 0 // 页数变为0
        infiniteMsgShow.value = false // 切换底部提示信息
      } else {
        scrollDisabled.value = false // 将无限滚动给打开
        infiniteMsgShow.value = true
      }
    })
    .catch(error => {
      ElMessage.error('数据加载失败', error)
      contentShow.value = false
    })
}

const formatOpenStatus = (openStatus: string) => {
  let openStatusStr = '未挑战';
  if (openStatus === 'OPEN') {
    openStatusStr = '正在挑战';
  } else if (openStatus === 'SUBMIT') {
    openStatusStr = '已挑战';
  }
  return openStatusStr;
}

const loadMore = () => {         
  scrollDisabled.value=true  //将无限滚动给禁用
  setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
    currentPage.value += 1;  //滚动之后加载第二页
    const request = {
    "page": currentPage.value,
    "size": 8
  }
    loadData(request);
  }, 500);
}

onMounted(()=>{
  const params = {
    "page": currentPage.value,
    "size": 8
  }
  loadData(params);
})
</script>

<style>

.card-color{
  /* 设置背景色为红色，透明度为0.5 */
  background-color: rgba(157, 198, 255, 0.05);
   /* background-color: rgba(255, 255, 255, 0.01);  */

}

.margin-left-12 {
  margin-left: 12px;
}

.margin-top-12 {
  margin-top: 12px;
}

.margin-top-28 {
  margin-top: 28px;
}

.ml-2 {
  margin-left: 5px;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

.box-card {
  width: 480px;
}

</style>