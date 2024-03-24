 <template>
  <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="18">
        <el-row>
          <el-col :span="6">
            <el-input v-model="challengeNameValue" size="large" placeholder="挑战名称" />
          </el-col>
          <el-col :span="2" class="margin-left-12">
            <el-button type="primary" size="large" @click="searchData">搜索</el-button>
          </el-col>
        </el-row>

        <el-row class="margin-top-12">
          <el-col :span="24">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="id" label="Id" width="60" />
              <el-table-column prop="challengeName" label="挑战名称" width="auto" min-width="25%" />
              <el-table-column prop="submitUser" label="提交人" width="100" />
              <el-table-column prop="fileName" label="wakeup" width="100">
                <template #default="scope">
                  <el-link type="primary" :href="scope.row.fileName" target="_blank">下载</el-link>
                </template>
                </el-table-column>
              <el-table-column prop="submitTime" label="提交时间" width="200" />
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
const challengeNameValue = ref('')
// 总记录数
const total = ref(0)
// 总条数
const currentPage = ref(1)
const tableData = ref<ChallengeRecordInfo[]>([])

const loadData = (params: object) => {
  const request = {
    "params": params
  }
  api.getChallengesRecord(request)
  .then(response => {
    if(response.data.data) {
      tableData.value = response.data.data;
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
    "name": challengeNameValue.value,
    "page": currentPage.value,
    "size": 10
  }
  loadData(params);
})

const searchData = () => {
  const params = {
      "name": challengeNameValue.value,
      "status": "",
      "page": currentPage.value,
      "size": 10
  }
  loadData(params);
}

</script>

<style>
.margin-left-12 {
  margin-left: 12px;
}

.margin-top-12 {
  margin-top: 12px;
}

.ml-2 {
  margin-left: 5px;
}</style>