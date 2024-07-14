<template>
    <el-row>
        <el-col :span="3"></el-col>
        <el-col :span="18">
        <el-card shadow="hover">
            <el-table :data="tableData" border style="width: 100%;" :header-cell-style="{ background: '#f4f6f8', color: '#000000' }">
                <el-table-column prop="name" label="名称" width="auto" />
                <el-table-column prop="value" label="次数" width="auto" />
            </el-table>
        </el-card>
        </el-col>
        <el-col :span="3"></el-col>
    </el-row>
</template>

<script lang="ts" setup>
import api from '@/api/index'

import { ref } from 'vue'  
const tableData = ref([]);

onMounted(()=>{
    api.statistics().then(result => {
        if(result.data.data) {
        tableData.value = result.data.data;
        } 
    })
  .catch(error => {
    ElMessage.error('数据加载失败', error)
  })
})
</script>
  
<style scoped>
  .el-col {
    text-align: center;
  }
</style>
  