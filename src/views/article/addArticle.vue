<template>
  <div class="app-container">
    <MdEditor v-model="text" @upload-img="onUploadImg" />
    <!-- <EditArticle mode="edit" /> -->
    <!-- <v-md-editor v-model="text" height="400px"></v-md-editor> -->
    <el-button @click="uploadArticle">提交</el-button>
  </div>
</template>

<script setup name="addArticle">
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import useUpload from '@/mixins/useUploadFile'

import { ref } from "vue";

const {onUploadImg} = useUpload()
const text = ref("adsa");


function uploadArticle() {
    console.log(text.value);
}
</script>

<style scoped lang="scss">
.app-container {
  width: 100%;
}
</style>