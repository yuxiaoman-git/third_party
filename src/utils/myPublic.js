
export function getSidebar() {
  if (this.$store.getters.device === "mobile") {
    return "0px";
  } else {
    if (this.$store.getters.sidebar.opened) {
      return "210px";
    } else {
      return "54px";
    }
  }
}
export const Global = {
  region: "oss-cn-hangzhou",
  bucket: "senyu-img",
}
export function filterItems(options, category) {
  const list = options.filter((el) => el.value === category);
  if (list.length) {
    return list[0];
  } else {
    return {};
  }
}
export function formatSeconds(value) {
  const result = parseInt(value);
  const h =
    Math.floor(result / 3600) < 10
      ? "0" + Math.floor(result / 3600)
      : Math.floor(result / 3600);
  const m =
    Math.floor((result / 60) % 60) < 10
      ? "0" + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60);
  const s =
    Math.floor(result % 60) < 10
      ? "0" + Math.floor(result % 60)
      : Math.floor(result % 60);

  let res = "";
  res += `${h}:`;
  res += `${m}:`;
  res += `${s}`;
  return res;
}

export function getImageSize(img_url) {
  if (!img_url) {
    return "";
  }
  const img = new Image();
  img.src = img_url;
  return new Promise((resolve) => {
    // 判断是否有缓存
    if (img.complete) {
      const { width, height } = img;
      const size = `${width}x${height}`;
      resolve({ size, width, height });
    } else {
      // 加载完成执行
      img.onload = () => {
        const { width, height } = img;
        const size = `${width}x${height}`;
        resolve({ size, width, height });
      };
      img.onerror = () => {
        resolve();
      };
    }
  });
}