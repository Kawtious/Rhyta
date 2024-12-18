<template>
    <div class="flex flex-row size-full">
        <div class="flex flex-col size-full">
            <nav class="nav-top-bar">
                <RouterLink
                    class="nav-item"
                    to="/export/availability-schedules"
                >
                    Availability Schedules
                </RouterLink>
                <RouterLink class="nav-item" to="/export/courses"
                    >Courses</RouterLink
                >
                <RouterLink class="nav-item" to="/export/groups"
                    >Groups</RouterLink
                >
                <RouterLink class="nav-item" to="/export/professors"
                    >Professors</RouterLink
                >
                <RouterLink class="nav-item" to="/export/schedules"
                    >Schedules</RouterLink
                >
                <RouterLink class="nav-item" to="/export/schedule-types"
                    >Schedule Types</RouterLink
                >
                <RouterLink class="nav-item" to="/export/semester-careers">
                    Semester Careers
                </RouterLink>
            </nav>

            <RouterView class="router-view" name="export" />
        </div>

        <ExportDownload class="right-sidebar" />
    </div>
</template>

<style scoped>
.nav-top-bar {
    @apply flex flex-row justify-center border-b-2 overflow-x-auto;
}

.nav-item {
    @apply text-center content-center;
    width: 120px;
    height: 60px;
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
}

.router-view {
    @apply w-full h-full;
}

.right-sidebar {
    @apply border-l-2 h-full;
    width: 160px;
}

@media (hover: hover) {
    .nav-item:hover {
        background-color: hsla(160, 100%, 37%, 0.2);
    }
}
</style>

<script setup lang="ts">
import ExportDownload from '@/components/export/ExportDownload.component.vue';
</script>
