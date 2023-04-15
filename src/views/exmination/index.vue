<template>
  <div class="exam-page">
    <h1>考试题库</h1>

    <el-table :data="examData">
      <el-table-column label="题干" prop="title" />

      <el-table-column label="选项">
        <template #default="scope">
          <span v-for="(item, index) in scope.row.options" :key="index">{{
            item
          }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="ans" label="答案" />

      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button type="primary">编辑</el-button>
            <el-button type="danger" @click="confirmDelete">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="deleteVisible" title="删除">
      <div>是否确认删除这条数据？</div>

      <template #footer>
        <div>
          <el-button type="danger" @click="handleDelete">删除</el-button>;
          <el-button type="primary" @click="deleteVisible = false"
            >取消</el-button
          >
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="editVisible" title="编辑">
      <el-form> </el-form>

      <template #footer>
        <div>
          <el-button type="primary" @click="handleUploadData">确定</el-button>
          <el-button type="warning" @click="editVisible = false"
            >取消</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  getExam,
  deleteQuestion,
  addQuestion,
  updateQuestion,
} from "@/api/exam";
import { ElMessage } from "element-plus";

const defaultData = {
  content: "",

  ans: "",
  options: [],
  picUrl: "",
  title: "",
  type: "",
};
const examData = ref([]);
const form = ref(defaultData);

onMounted(async () => {
  fetchData();
});

const deleteVisible = ref(false);

async function fetchData() {
  const res = await getExam("?type=select&page=1&size=10");

  examData.value = res.data;
}

async function confirmDelete(item) {
  form.value = item;
  deleteVisible.value = true;
}

async function handleDelete() {
  const arr = [];
  arr.push(form.value.id);
  const res = await deleteQuestion(arr);
  ElMessage({
    type: "success",
    message: "操作成功",
  });
  fetchData();
}

// 用去确实是添加还是编辑
const isAdd = ref(false);
async function handleUploadData() {
  if (isAdd.value) {
    // 添加
  }
}
</script>

<style lang="scss" scoped>
.exam-page {
  padding: 12px;
}
</style>