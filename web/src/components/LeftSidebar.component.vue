<template>
    <nav class="left-sidebar">
        <ol class="nav-links">
            <li class="nav-title">Edit</li>
            <li class="nav-item">
                <RouterLink class="router-link" to="/availability-schedules">
                    Availability Schedules
                </RouterLink>
            </li>
            <li class="nav-title">Export</li>
            <li class="nav-item">
                <RouterLink class="router-link" to="/export">Export</RouterLink>
            </li>
        </ol>
    </nav>
</template>

<style scoped>
.left-sidebar {
    @apply ml-8 text-left border-r-2;
}

.nav-links {
}

.nav-item {
    @apply text-sm;
    width: 164px;
    height: 30px;
}

.nav-title {
    @apply mt-6 font-bold text-xs uppercase;
    width: 164px;
    height: 30px;
}

.router-link {
    @apply block h-full content-center;
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
}

@media (hover: hover) {
    .router-link:hover {
        background-color: hsla(160, 100%, 37%, 0.2);
    }
}
</style>
