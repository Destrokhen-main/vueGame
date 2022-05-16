<template>
  <div class="d-flex justify-content-center">
    <div class="screen">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.screen {
  background-color:bisque;
  width: 1200px;
  height: 100%;
}
</style>
