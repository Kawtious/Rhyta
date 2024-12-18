<template>
    <div class="flex flex-row h-full">
        <LeftSidebar class="left-sidebar" />

        <div class="router-view">
            <RouterView name="view" />
        </div>
    </div>

    <footer></footer>
</template>

<style scoped>
.router-view {
    @apply w-full;
}
</style>

<script setup lang="ts">
import LeftSidebar from '@/components/LeftSidebar.component.vue';
import { RouterView } from 'vue-router';
</script>
