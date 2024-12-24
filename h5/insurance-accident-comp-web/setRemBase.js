function setRemBase() {
  const baseSize = 10; // 基准值，例如 10px， 同时将蓝湖上面rem基准值设置为10px
  const designWidth = 375; // 设计稿宽度，例如 375px
  const screenWidth = Math.min(window.innerWidth, 750); // 最大限制宽度为 750px（避免大屏过大）
  document.documentElement.style.fontSize =
    (screenWidth / designWidth) * baseSize + "px";
}

// 初始化
setRemBase();

// 监听窗口大小变化
window.addEventListener("resize", setRemBase);
