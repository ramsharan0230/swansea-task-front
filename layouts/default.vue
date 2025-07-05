<template>
    <div class="min-h-screen flex flex-col">
        <includes-navbar></includes-navbar>
        <main class="flex-1 pt-20 px-3 pb-24"> 
            <div class="container mx-auto max-w-screen-lg">
                <slot />
            </div>
        </main>
        <includes-footer></includes-footer>
    </div>
</template>