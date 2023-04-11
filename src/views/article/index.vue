<template>
  <div>
    <h1>文章管理模块</h1>

    <div>
      <el-button type="primary" @click="addArticle">添加</el-button>
    </div>

    <div>
      <el-table :data="articleData">
        <el-table-column label="文章标题" prop="title" />
        <el-table-column label="文章封面">
          <template #default="scope">
            <el-image style="height: 68px" :src="scope.row.picUrl" />
          </template>
        </el-table-column>
        <el-table-column label="文章介绍" prop="description" />

        <el-table-column label="文章发表时间">
          <template #default="scope">
            <span>{{ parseTime(scope.row.createAt) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="观看次数">
          <template #default="scope">
            <span>{{ scope.row.visit || 0 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary"> 编辑 </el-button>
            <el-button type="danger" @click="confirmDelete(scope.row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 删除确认框 -->
    <el-dialog v-model="deleteVisible" title="是否确定删除这条数据？">
    
        <template #footer>
            <div>
                <el-button type="primary">确定</el-button>
                <el-button type="info" @click="deleteVisible = false">取消</el-button>
            </div>
        </template>

    </el-dialog>

  </div>
</template>

<script setup>
import { parseTime } from "../../utils/ruoyi";
import { onMounted, ref } from "vue";
import { getArticles } from "@/api/article";

const defaultArticleValue = {
  content: "",
  title: "",
  picUrl: "",
  url: "",
  description: "",
};

const articleData = ref([]);

const form = ref(defaultArticleValue);

const deleteVisible = ref(false)

onMounted(async () => {
  const res = await getArticles();
  articleData.value = res.data;
});

function confirmDelete(item) {
    form.value = item;

    deleteVisible.value = true;
}

const integralData = ref([]);
</script>

<style>
</style>