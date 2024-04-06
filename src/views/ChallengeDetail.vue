<template>
  <el-row>
    <el-col :span="3"></el-col>
    <el-col :span="18">
      <el-card>
        <template #header>
          <div class="card-header">
            <el-row>
              <el-col :span="4">挑战详情</el-col>
              <el-col :span="5" :offset="15" lab>
                剩余时间: 
                <el-text class="mx-1" type="primary" size="large">{{ timeStr }}</el-text>
              </el-col>
            </el-row>
          </div>
        </template>
        <el-descriptions :column="1">
          <el-descriptions-item label="挑战名称: ">{{ challengeDetail?.name }}</el-descriptions-item>
          <el-descriptions-item label="挑战描述: ">暂无</el-descriptions-item>
          <el-descriptions-item label="挑战限时: ">100分钟</el-descriptions-item>
          <el-descriptions-item label="挑战状态: ">
            <el-tag size="small" :type="getChallengeStatus(challengeDetail?.openStatus)">{{ getChallengeStatusText(challengeDetail?.openStatus) }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="场景操作：" label-align="center">
            <template v-if="challengeDetail?.openStatus !== 'OPEN'">
              <el-button type="primary" size="small" @click="openScene" :loading="isSending">开启场景</el-button>
            </template>
            <template v-if="challengeDetail?.openStatus === 'OPEN'">
              <el-button type="primary" size="small" @click="closeScene" :loading="isSending">关闭场景</el-button>
            </template>
          </el-descriptions-item>
          <template v-if="challengeDetail?.address">
            <el-descriptions-item v-for="(item, index) in challengeDetail?.address" :key="index" label-align="center">
              <el-link type="primary" @click="openNewPage(item)">{{ item }}</el-link>
            </el-descriptions-item> 
          </template>
          <el-descriptions-item label="Wakeup：" label-align="center" style="display: flex; justify-content: space-between;">
            <el-upload
              class="inline-block"
              :headers="tokenHeaders"
              :action="`${getAppUrl()}/v1/wakeup/upload/${challengeDetail?.id}`"
              :limit="1"
              ref="upload"
              :on-change="changeFile"
              :auto-upload="false" 
              :data="formData">
                <template #trigger>
                    <el-button size="small" type="primary">选取附件</el-button>
                </template>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">提交</el-button>
            </el-upload>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
    <el-col :span="3"></el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import api from '@/api/index'
import { useRouter } from 'vue-router'
import type { UploadFile } from 'element-plus'
import type  { EpPropMergeType } from "element-plus/es/utils/vue/props/types"

const router = useRouter()
const file = ref()
const isSending = ref(false);
const formData = ref<FormData | null>();
const upload = ref(null); // 定义一个ref引用el-upload组件
const countdown = ref();
let intervalId;
const timeStr = ref('00分00秒')

const getAppUrl = () => import.meta.env.VITE_APP_API_URL;

const tokenHeaders = {
    Authorization: `Bearer ${localStorage.token}`
  }

// 定义 challengeDetail 变量并赋予初始类型
const challengeDetail = ref<ChallengeDetail | null>(null);

// 格式化倒计时
const formattedCountdown = () => {
  const minutes = Math.floor(countdown.value / 60);
  const seconds = countdown.value % 60;
  return `${minutes}分${Math.trunc(seconds)}秒`;
};

const initTimer = (time: number) => {
  countdown.value = time;
  intervalId = setInterval(() => {
    countdown.value -= 1;
    timeStr.value = formattedCountdown();
    if (countdown.value <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);
}

const clearTimer = () => {
  countdown.value = 0;
  timeStr.value = formattedCountdown();
  clearInterval(intervalId);
}

const openScene = () => {
  isSending.value = true;
  api.openScene(challengeDetail.value.id)
    .then((res) => {
      isSending.value = false;
      if (res.data && res.data.code === "200") {
        challengeDetail.value.address = res.data.data;
        challengeDetail.value.openStatus = 'OPEN'
        initTimer(2 * 60 * 60);
        ElMessage.success('场景开启成功')
      } else {
        ElMessage.error('场景开启失败')
      }
    })
    .catch((err) => {
      isSending.value = false;
      ElMessage.error('场景开启失败', err)
    });
}

const closeScene = () => {
  isSending.value = true;
  api.closeScene(challengeDetail.value.id)
    .then((res) => {
      isSending.value = false;
      if (res.data && res.data.code === "200") {
        challengeDetail.value.address = [];
        challengeDetail.value.openStatus = ''
        clearTimer();
        ElMessage.success('场景关闭成功')
      } else {
        ElMessage.error('场景关闭失败')
      }
    })
    .catch((err) => {
      isSending.value = false;
      ElMessage.error('场景关闭失败', err)
    });
}

const changeFile = (uploadFile: UploadFile) => {
    file.value = uploadFile;
}

const submitUpload = () => {
    upload.value.submit();
    challengeDetail.value.address = [];
    challengeDetail.value.openStatus = '';
    clearInterval(intervalId);
}

const getChallengeStatus = (challengeStatus: string) => {
  let status: EpPropMergeType<StringConstructor, "" | "success" | "warning" | "info" | "danger" | "", unknown>;
  if (challengeStatus === 'OPEN') {
    status = 'success';
  } else {
    status = 'info';
  }
  return status;
}

const getChallengeStatusText = (challengeStatus: string) => {
  let text = '';
  if (challengeStatus === 'OPEN') {
    text = '开启';
  } else {
    text = '未开启';
  }
  return text;
}

const loadData = (challengeId: string) => {
  api.getChallengesDetail(challengeId)
  .then(result => {
      if(result.data && result.data.code === "200") {
        // 确保API返回的数据与ChallengeDetail类型匹配
        challengeDetail.value = result.data.data as ChallengeDetail;
        const date1: any = new Date(result.data.data.openTime);
        if (result.data.data.openTime) {
          const date2: any = new Date();
          // 计算剩余时间
          const hastimes = (2 * 60 * 60) - ((date2.getTime() - date1.getTime())/1000)
          if (hastimes > 0) {
            initTimer(hastimes);
          }
        }
      }
    })
    .catch(error => {
      ElMessage.error('数据加载失败', error)
    })
}

const openNewPage = (url: string) => {
  window.open(`http://${url}`, '_blank');
}

onMounted(()=> {
  loadData(`${router.currentRoute.value.params.id}`)
})

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

</script>

<style>
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

.inline-block {
  display: inline-block;
}




</style>