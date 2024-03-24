<template>
  <el-row>
    <el-col :span="3"></el-col>
    <el-col :span="18">
      <el-row>
        <el-col :span="3">
          <el-select v-model="searchType" class="m-2" placeholder="查询类型" size="large" style="width: 110px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="searchParam" size="large" placeholder="搜索匹配的挑战" />
        </el-col>
        <el-col :span="2" class="margin-left-12">
          <el-button type="primary" size="large" @click="searchData">搜索</el-button>
        </el-col>
      </el-row>
      
      <el-row class="margin-top-12">
        <el-col :span="24">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="Id" width="60" />
            <el-table-column prop="name" label="挑战名称" width="auto" min-width="25%" />
            <el-table-column prop="challengeType" label="挑战类别" width="200" />
            <el-table-column prop="status" label="挑战状态" width="110">
              <template #default="scope">
                {{ scope.row.status === 'SHOW' ? '显示' : '隐藏' }}
                <el-switch v-model="scope.row.status" active-value='SHOW' inactive-value="HIDDEN" :loading="scope.row.switchLoading" :before-change="beforeShowChangeManage.bind(this, scope.row)" class="ml-2" style="--el-switch-on-color: #409EFF; --el-switch-off-color: #B5B5B5" />
              </template>
            </el-table-column>
          </el-table> 
        </el-col>
      </el-row>

      <el-row class="margin-top-12" justify="end">
        <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="currentPage" @change="searchData" />
      </el-row>
    </el-col>
    <el-col :span="3"></el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import api from '@/api/index'

const searchType = ref('Type_Name')
const searchParam = ref('')
// 总记录数
const total = ref(0)
// 总条数
const currentPage = ref(1)

const options = [
  {
    value: 'Type_Name',
    label: '挑战名称',
  },
  {
    value: 'Type_Status',
    label: '挑战状态',
  },
]

const tableData = ref<ChallengeManageInfo[]>([])

const loadData = (params: object) => {
  const request = {
    "params": params
  }
  api.getAdminChallenges(request)
  .then(response => {
    if(response.data.data) {
      tableData.value = response.data.data;
      tableData.value.forEach((row) => {
        row.switchLoading = false;
      });
      total.value = response.data.totalCount;
      currentPage.value = response.data.currentPage
    }
  })
  .catch(error => {
    ElMessage.error('数据加载失败', error)
  });
}

onMounted(()=>{
  const params = {
    "page": currentPage.value,
    "size": 10
  }
  loadData(params);
})

const searchData = () => {
  const params = {
      "name": "",
      "status": "",
      "page": currentPage.value,
      "size": 10
  }
  if(searchType.value === 'Type_Name') {
    params.name = searchParam.value;
  } else if (searchType.value === 'Type_Status') {
    params.status = searchParam.value;
  }
  loadData(params);
}

const beforeShowChangeManage = (row: any) => new Promise((resolve, reject)=>{   
    const request = {
      "data": {
        "id": row.id,
        "status": row.status === "SHOW" ? "HIDDEN" : "SHOW"
      }
    }
    row.switchLoading = true;
    api.updateChallengesStatus(request)
    .then(response => {
      if(response.data && response.data.code === 200) {
        resolve(true)   
        row.switchLoading = false;
        ElMessage.success('状态更新成功')
      } else {
        reject(new Error("服务器异常"))   
        row.switchLoading = false;
        ElMessage.error('状态更新失败')
      }
    })
    .catch(error => {
      reject(error)
      row.switchLoading = false;
      ElMessage.error('状态更新失败')
    });
})
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