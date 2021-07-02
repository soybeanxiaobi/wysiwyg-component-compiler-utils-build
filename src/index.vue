<template>
  <div>
    <span>test-11</span>
    <span>{{ getLocationUrl() }}</span>
    <p>xiaobe-test-page-design-build</p>
  </div>
</template>

<script>
export default {
  name: "test",
  methods: {
    getLocationUrl() {
      return window.location.href;
    },
  },
};
</script>
