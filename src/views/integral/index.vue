<template>
  <div>
    <h1>积分商品管理</h1>
    <el-button @click="openAdd" type="primary">添加 +</el-button>

    <div>
      <el-table :data="integralData">
        <el-table-column label="商品名称" prop="name" />
        <el-table-column label="封面">
          <template #default="scope">
            <el-image
              style="height: 88px"
              fit="fit"
              :src="scope.row.banners[0]"
            />
          </template>
        </el-table-column>
        <el-table-column label="兑换积分" prop="integral" />
        <el-table-column label="库存(/件)" prop="stock" />
        <el-table-column label="商品描述" prop="description" />

        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="warning" @click="confirmDelete(scope.row)"
              >删除</el-button
            >
            <el-button type="primary" @click="openEdit(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      class="delete-visible"
      title="确定要删除这条数据吗？"
      v-model="deleteVisible"
    >
      <template #footer>
        <div>
          <el-button type="info" @click="deleteVisible = false">取消</el-button>
          <el-button type="primary" @click="deleteIntegralGood">确定</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="editVisible" title="编辑积分商品">
      <el-form :model="form">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="商品图片">
          <!-- <el-image v-show="form.banners.length > 0" /> -->
          <!-- <div class="upload" v-show="form.banners.length <= 0">
          <el-input type="file" @input="uploadBanner" />
        </div> -->
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
              v-if="form.banners.length > 0"
              :src="form.banners[0]"
              class="banner"
            />
            <el-icon v-else class="banner-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="兑换积分">
          <el-input v-model="form.integral" />
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="form.stock" />
        </el-form-item>
        <el-form-item label="商品简介">
          <el-input v-model="form.description" />
        </el-form-item>
        <MdEditor v-model="form.content" @upload-img="onUploadImg" />
      </el-form>

      <template #footer>
        <div>
          <el-button type="info" @click="editVisible = false">取消</el-button>
          <el-button type="primary" @click="handleGoodUpload">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { getIntegralGoodList, uploadIntegralGood, updateGoodInfo } from "@/api/integral";
import { upload } from "@/api/upload";
import useUploadFile from '@/mixins/useUploadFile'

import MdEditor from "md-editor-v3";
const {onUploadImg}  = useUploadFile();

const integralData = ref([]);

onMounted(async () => {
  fetchData();
});


const defaultData = {
  banners: [],
  content: null,
  description: "",
  id: 0,
  integral: 0,
  name: "",
  stock: 0,
};

async function fetchData() {
  const queryString = "page=1&size=10&order=desc";
  const resp = await getIntegralGoodList(queryString);
  integralData.value = resp.data;
}

const form = ref(defaultData);
const isAdd = ref(true);
const editVisible = ref(false);

const deleteVisible = ref(false);

function confirmDelete(item) {
  console.log(item);
  form.value = item;
  deleteVisible.value = true;
}

function deleteIntegralGood() {
  deleteVisible.value = false;
}

function resetForm() {
  isAdd.value = true;
  form.value = defaultData;
}

async function uploadBanner(e) {
  console.log(e);
  const formData = new FormData();
  formData.append("file", e.raw);
  const res = await upload(formData);
  console.log(res.data);
  form.value.banners.push(res.data);
}

function openEdit(item) {
  form.value = item;
  isAdd.value = false;

  editVisible.value = true;
}

function openAdd() {
  resetForm();
  editVisible.value = true;
}

async function handleGoodUpload() {
  // todo
  let res;
  if (isAdd.value) {
    // 新增商品
    res = await uploadIntegralGood(form.value);
  } else {
    // 修改商品信息
    res = await updateGoodInfo(form.value);
  }
  ElMessage.success("操作成功！");
  fetchData();
}

const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw);
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== "image/jpeg" || rawFile.type !== "image/png") {
    ElMessage.error("Avatar picture must be picture format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

function handleChange(e) {
  console.log(e);
}
</script>

<style lang="scss" scoped>
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