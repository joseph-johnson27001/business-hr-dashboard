<template>
  <div class="info-card">
    <h3 class="info-card-title">{{ title }}</h3>
    <div class="chart-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.info-card {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 4px;
  display: flex;
  flex-direction: column;
}

.chart-container {
  flex: 1;
  min-height: 200px;
  width: 100%;
}

.info-card-title {
  font-size: 14px;
  font-weight: 400;
  color: #006ba6;
  text-align: left;
}

@media (max-width: 400px) {
  .info-card {
    padding: 20px 10px;
  }
}
</style>
