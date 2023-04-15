<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="文章标题">
        <el-input v-model="article.title" />
      </el-form-item>

      <el-form-item label="文章描述">
        <el-input v-model="article.description" />
      </el-form-item>

      <el-form-item label="文章封面">
        <el-upload
          class="banner-uploader"
          action="http://127.0.0.1:8899/api/upload"
          :show-file-list="false"
          :on-change="uploadBanner"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="false"
        >
          <img
            v-if="form.picUrl"
            :src="form.picUrl"
            class="banner"
          />
          <el-icon v-else class="banner-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <MdEditor v-model="article.content" @upload-img="onUploadImg" />
    <el-button @click="uploadArticle" type="primary">提交</el-button>
  </div>
</template>

<script setup name="addArticle">
import useArticleStore from "@/store/modules/article";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import useUpload from "@/mixins/useUploadFile";
import {upload} from '@/api/upload'

import { computed, ref } from "vue";

const articleStore = useArticleStore();
const { onUploadImg } = useUpload();

const form  = ref(articleStore.chooseArticle);

async function uploadBanner(e) {
  const formData = new FormData();
  formData.append("file", e.raw);
  const res = await upload(formData);
  console.log(res.data);
  form.value.picUrl = (res.data);
}


const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};

function uploadArticle() {
  console.log(article.value);
}

const article = computed(() => articleStore.chooseArticle);
</script>

<style scoped lang="scss">
.app-container {
  width: 100%;
}

.banner-uploader {
  width: 88px;
  height: 88px;
  border: 1px solid #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  .banner {
    width: 100%;
    height: 100%;
  }
  .banner-uploader-icon {
    width: 68px;
    height: 68px;
  }
}
</style>