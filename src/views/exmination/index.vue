<template>
  <div class="exam-page">
    <h1>考试题库</h1>

    <el-table :data="examData">
        <el-table-column label="题干" prop="title"/>
        
        <el-table-column label="选项" >
            <template #default="scope">
                <span v-for="(item, index) in scope.row.options" :key="index">{{ item }}</span>
            </template>
        </el-table-column>

        <el-table-column prop="ans" label="答案"/>

        <el-table-column label="操作" >
            <template #default="scope">
                <div>
                    <el-button type="primary">编辑</el-button>
                    <el-button type="danger">删除</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {getExam} from '@/api/exam'

const examData = ref([])

onMounted(async () => {
    const res = await getExam('?type=select&page=1&size=10');

    examData.value = res.data
})

</script>

<style lang="scss" scoped>

</style>