<script setup lang="ts">
const props = defineProps({
  total: Number,
  pageNum: Number,
  limitSize: Number
});

const emit = defineEmits(["pageChange", "sizeChange"]);

const currentPage = computed({
  get() {
    return props.pageNum;
  },
  set(val) {
    emit("pageChange", val);
  }
});
const pageSize = computed({
  get() {
    return props.limitSize;
  },
  set(val) {
    emit("sizeChange", val);
  }
});
</script>

<template>
  <div class="page-container">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      background
      layout="total,sizes,prev,pager,next,jumper"
      :page-sizes="[2, 10, 20, 30, 50]"
      :total="total"
    />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  padding: 20px 0;
}
</style>
