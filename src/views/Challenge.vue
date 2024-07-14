<template>   
  <el-row>
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-row>
        挑战类型：
        <el-button
          key="全部"
          type="primary"
          @click="selectedType('全部')"
          :bg="selectType === '全部'"
          text
        >
          全部
        </el-button>
        <el-button
          v-for="challengesType in challengesTypes"
          :key="challengesType"
          type="primary"
          @click="selectedType(challengesType)"
          :bg="selectType === challengesType"
          text
        >
          {{ challengesType }}
        </el-button>
      </el-row>
      <el-row></el-row>
    </el-col>
    <el-col :span="2"></el-col>
    </el-row>
  <el-row>
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-row :v-show="contentShow">
        <el-col
          v-for="(data, index) in tableData"
          :key="data.id"
          :span="4"
          :offset="index%5 > 0 ? 1 : 0"
          class="margin-top-2"
        >
        <el-card @click="gotoChallenge(data.id)" shadow="always" class="margin-bottom-28 card-color " >
          <template #header>
            <div class="card-header " style="height: 20px;">
              <el-tooltip
                class="box-item"
                effect="dark"
                :content="data.name"
                placement="top-start"
              >
              <p style="width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: center;font-size: 18px;color:#957735;">{{ data.name }}</p>
              </el-tooltip>
            </div>
          </template>
          <div class="flex-parent">
            <img src="@/assets/other.png" style="width: 50%;object-fit: contain;" class="image" />
          </div>
          <template #footer>
            <div class="flex-parent">
              {{ formatOpenStatus(data.openStatus) }}
            </div>
          </template>
        </el-card>
        </el-col>
      </el-row>
      <el-row justify="end">
        <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total" v-model:current-page="currentPage" @change="searchData" />
      </el-row>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
 
</template>

<script lang="ts" setup>
import {useRouter } from 'vue-router'
import api from '@/api/index'
const tableData = ref<ChallengeInfo[]>([])
// 总记录数
const total = ref(0)
// 当前页数
const currentPage = ref(1);

const pageSize = 15
// 每页条数
const contentShow = ref(true);
const challengesTypes = ref([]);
const selectType = ref('全部');

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
    if(result.data.data) {
      console.log(result.data)
      total.value = result.data.totalCount
      tableData.value = result.data.data;
      currentPage.value = result.data.currentPage
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

const searchData = () => {         
    const request = {
    "challengeType": selectType.value,
    "page": currentPage.value,
    "size": pageSize
  }
  loadData(request);
}

const loadChallengesTypes = () => {
  api.getChallengesTypes().then((res:any)=>{
    if(res.data.code === '200'){
      challengesTypes.value = res.data.data;
    }
  })
}

const selectedType = (item: string) => {
  selectType.value = item
  currentPage.value = 1;
  tableData.value = []
  const params = {
    "challengeType": selectType.value,
    "page": currentPage.value,
    "size": pageSize
  }
  loadData(params);
}

onMounted(()=>{
  const footerNode = document.querySelector('footer');
  if (footerNode) {
    const parent = footerNode.parentNode;
    parent.removeChild(footerNode);
  }
  loadChallengesTypes();
  const params = {
    "challengeType": selectType.value,
    "page": currentPage.value,
    "size": pageSize
  }
  loadData(params);
})
</script>

<style>

.el-button + .el-button {
  margin-left: 0;
}

.card-color{
  /* 设置背景色为红色，透明度为0.5 */
  /* background-color: rgba(157, 198, 255, 0.05); */
   background-color: #545c6406; 

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

.margin-bottom-28 {
  margin-bottom: 28px;
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
  width: 50%;
  display: block;
} 

.box-card {
  width: 230px;
}

.el-card__header {
padding: calc(var(--el-card-padding) - 12px) var(--el-card-padding);
border-bottom: 0px solid var(--el-card-border-color);
box-sizing: border-box;
}

.el-card__body {
padding: calc(var(--el-card-padding) - 12px);
}

.flex-parent {
  display: flex;
  justify-content: center;
}
</style>