<template>
  <div :style="{ height: `${height}px` }" />
</template>

<script>
export default {
  name: "white-case",

  components: {
    [White.name]: White,
  },

  props: {
    height: Number,
  },
};
</script>
