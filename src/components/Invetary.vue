<template>
  <div class="invent">
    <div
      v-for="item in $store.state.Inventary"
      :key="item.id"
      class="invent__block"
      @click="sellProduct(item)"
    >
      <div v-if="item.name !== ''">
        <p>{{item.name}}</p>
        <p>{{item.price}}</p>
        <p>{{item.count}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import {useStore} from 'vuex';
import ItemInventory from "../interface/itemInventary";

export default defineComponent({
  setup() {
    const store = useStore();

    const sellProduct = (object: ItemInventory) => {
      store.dispatch('sellProduct', object);
    }

    return {
      sellProduct
    }
  }
});
</script>

<style lang="scss" scoped>
p {
  margin-bottom:0;
  padding-bottom:0;
}

.invent {
  display: flex;
  flex-wrap: wrap;

  &__block {
    width: 100px;
    height: 100px;
    outline: 1px solid black;
    display: flex;
    justify-content:center;
    align-items: center;
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
