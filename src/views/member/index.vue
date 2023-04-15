<template>
  <div class="member-container">
    <h1>用户管理</h1>

    <el-table :data="memberList">
      <el-table-column label="用户昵称" prop="nickName" />

      <el-table-column label="头像">
        <template #default="scope">
          <div class="u-info">
            <el-avatar :src="scope.row.avatarUrl"></el-avatar>
            <el-tag class="ml-2" type="success">小程序</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="积分" prop="integral">
        <template #default="scope">
          <span>{{ scope.row.integral || 0 }}</span>
        </template>
    </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button @click="editUser(scope.row)" type="primary">
              编辑
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog v-model="editVisible" title="编辑用户">
    
        <el-form >
            <el-form-item label="积分:">
                <el-input v-model="form.integral"/>
            </el-form-item>
        </el-form>

        <template #footer>
            <div>
                <el-button @click="submitEdit" type="primary">确定</el-button>
                <el-button type="info" @click="editVisible = false;">取消</el-button>
            </div>
        </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getMemberList } from "@/api/member";
import { ElMessage } from "element-plus";

const memberList = ref([]);
const defaultForm = {
  avatarUrl: "",
  id: null,
  integral: null,
  maOpenId: "",
  mobile: null,
  nickName: "",
};

onMounted(async () => {
  const res = await getMemberList("?page=1&size=10&order=id desc");
  memberList.value = res.data;
});

const form = ref(defaultForm);

const editVisible = ref(false);

function editUser(item) {
    form.value = item;

    editVisible.value = true;
}

function submitEdit() {
    editVisible.value  = false;
    ElMessage({
        type: 'success',
        message: '操作成功'
    })
}
</script>

<style lang="scss" scoped>
.member-container {
  padding: 12px;
}
.u-info {
  display: flex;
  width: 100px;
  justify-content: space-between;
  align-items: center;
}
</style>