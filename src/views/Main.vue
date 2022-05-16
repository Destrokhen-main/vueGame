<template>
  <div class="container">
    <div class="row">
      <div class="col-12 main__shop">
        <Shop />
      </div>
      <div class="col-7">
        <Inventary />
      </div>
      <div class="col-5">
        <InfoBlock />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"

import Shop from "../components/Shop.vue";
import Inventary from "../components/Invetary.vue";
import InfoBlock from "../components/InfoBlock.vue";

import { useStore } from 'vuex';
import { onUnmounted } from "vue";

export default defineComponent({
  components: {
    Shop,
    Inventary,
    InfoBlock,
  },
  setup() {
    const text = "Главная";
    const store = useStore();

    const interval = setInterval(function() {
      store.dispatch("modifyShopList");
    }, 5000)

    onUnmounted(() => clearInterval(interval));

    return {
      text
    }
  },
})
</script>

<style lang="scss" scoped>
.main {
  &__shop {
    height: 70vh
  }
}
</style>
