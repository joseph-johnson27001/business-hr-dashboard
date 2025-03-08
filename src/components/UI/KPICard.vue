<template>
  <div class="kpi-card">
    <div class="kpi-icon" :style="{ background: gradient }">
      <i :class="icon"></i>
    </div>
    <div class="kpi-stat">
      <div class="stat-value">{{ stat }}</div>
      <div class="stat-title">{{ title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KPICard",
  props: {
    icon: {
      type: String,
      required: true,
    },
    stat: {
      type: [Number, String],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    gradient: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.kpi-card {
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.kpi-icon {
  width: 45px;
  height: 45px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.kpi-stat {
  margin-left: 10px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: left;
}

.stat-title {
  font-size: 14px;
  color: #888;
}
</style>
