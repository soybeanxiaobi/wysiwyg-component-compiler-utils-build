<template>
  <div className="line-case">
    <div :style="createStyle(value)" />
  </div>
</template>

<script>
export default {
  name: "line-case",

  components: {
    [White.name]: White,
  },

  props: {
    color: String,
    lineType: String,
    hasPadding: Boolean,
  },

  methods: {
    createStyle(value) {
      const { color, hasPadding, lineType } = value;

      return {
        height: 0,
        borderTopWidth: "1px",
        margin: hasPadding ? "0 10px" : 0,
        borderColor: color,
        borderStyle: lineType,
      };
    },
  },
};
</script>
<style scoped>
@import "./index.scss";
</style>
