<template>
  <div>
    {{text}}
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
  setup() {
    const text = "Главная";

    return {
      text
    }
  },
})
</script>
