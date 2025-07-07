<template>
  <div class="min-h-screen flex flex-col">
    <includes-navbar></includes-navbar>

    <main class="flex-1 pt-20 px-4 pb-24"> 
      <div class="w-full px-4 sm:px-6 md:px-8">
        <slot />
      </div>
    </main>

    <includes-footer></includes-footer>
  </div>
</template>