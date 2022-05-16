<template>
  <table class="w-100">
    <tr
      v-for="item in $store.state.listShopItem"
      :key="item.id"
      @click="addProduct(item)"
    >
      <td
        class="p-3"
      >{{item.name}}</td>
      <td
        :class="'p-3 ' + checkClass(i,item.listPrice)"
        v-for="(price, i) in item.listPrice"
        :key="i"
      >
        {{price}}
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import {useStore} from 'vuex';
import { ItemShop } from "../interface/shopItem";

export default defineComponent({
  setup() {
    const store = useStore();

    const checkClass = (idx: number, arrPrice: Array<number>) : string => {
      if (idx === 0 || arrPrice[idx] === 0) return "default";
      if (arrPrice[idx - 1] > arrPrice[idx])
        return "red"
      else
        return "green";

    }

    const addProduct = async (item: ItemShop) => {
      const res = await store.dispatch('addProduct', item);
      if (res !== true) {
        alert(res);
      }
    };

    return {
      addProduct,
      checkClass
    }
  }
})
</script>

<style lang="scss" scoped>
.green {
  color: green;
}

.red {
  color: red;
}
</style>
