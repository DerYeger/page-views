<!-- #region example -->
<script async setup lang="ts">
import PageViews from '@yeger/page-views'
import { onMounted, ref } from 'vue'

const views = ref<number>()

PageViews.autoSubmitViews()

onMounted(async () => {
  views.value = await PageViews.getViews()
})
</script>

<template>
  <div class="page-views">
    <span v-if="views === undefined">Loading...</span>
    <span v-else>{{ views }} views</span>
  </div>
</template>
<!-- #endregion example -->

<style scoped>
.page-views {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: 100%;
}
</style>
