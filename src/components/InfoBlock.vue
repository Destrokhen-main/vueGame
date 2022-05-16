<template>
  <div>
    <div class="row">
    <div class="col-5">Баланс</div>
    <div class="col-1">:</div>
    <div class="col-6">{{ $store.state.balance }}</div>
  </div>
  <div class="row">
    <div class="col-5">Количество</div>
    <div class="col-1">:</div>
    <div class="col-6">{{ getAmount }}</div>
  </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"
import { useStore } from 'vuex';
import { computed } from 'vue';

export default defineComponent({
  setup() {
    const store = useStore();

    const getAmount = computed(() => store.getters.getInventory.filter(el => el.name !== "").length);

    return {
      getAmount,
    }
  }
})
</script>
