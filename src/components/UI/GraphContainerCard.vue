<template>
  <div class="graph-card">
    <!-- Card Header -->
    <div class="graph-card-header">
      <div class="graph-title">{{ title }}</div>
      <select
        v-model="selectedOption"
        @change="onTimeframeChange"
        class="timeframe-dropdown"
      >
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <div class="graph-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "GraphContainerCard",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: "Monthly",
      options: ["Daily", "Weekly", "Monthly", "Yearly"],
    };
  },
  methods: {
    onTimeframeChange() {
      this.$emit("timeframe-changed", {
        title: this.title,
        selectedOption: this.selectedOption,
      });
    },
  },
};
</script>

<style scoped>
.graph-card {
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  font-family: "Inter";
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.graph-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.graph-title {
  font-size: 14px;
  font-weight: 400;
  color: #006ba6;
  text-align: left;
}

.timeframe-dropdown {
  font-family: "Assistant" !important;
  border: 1px solid #ccc;
  padding: 10px;
  padding-left: 5px;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fff;
  cursor: pointer;
  outline: none;
}

.graph-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}
</style>
