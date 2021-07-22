<template>
  <div class="xiaobe-test-scss">
    <p class="xiaobe-test-scss-title">{{ title }}</p>
    <span>{{ getLocationUrl() }}</span>
  </div>
</template>

<script>
export default {
  name: "xiaobe-test",
  methods: {
    getLocationUrl() {
      return window.location.href;
    },
  },
  data() {
    return {
      title: "xiaobe2米8",
    };
  },
};
</script>
<style scoped lang="scss">
.xiaobe-test-scss {
  font-size: 12px;

  &-title {
    color: red;
  }
}
</style>

<style>
.xiaobe-test-css {
  font-size: 14px;
}
</style>
