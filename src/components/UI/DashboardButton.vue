<template>
  <!-- Floating Button -->
  <a
    href="https://www.templatedashboards.com"
    target="_blank"
    rel="noopener"
    class="floating-button"
  >
    <img src="/dashboard-logo.png" alt="Go to templatedashboards.com" />
  </a>
</template>

<style>
.floating-button {
  position: fixed;
  bottom: 15px;
  right: 20px;
  z-index: 1000;
  background: white;
  border: 1px solid #d8d7d7;
  border-radius: 25%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.floating-button:hover {
  transform: scale(1.1);
}

.floating-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
