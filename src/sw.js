// 监听 service worker 的 install 事件
this.addEventListener('install', function (event) {
  // 如果监听到了 service worker 已经安装成功的话，就会调用 event.waitUntil 回调函数
  event.waitUntil(
    // 安装成功后操作 CacheStorage 缓存，使用之前需要先通过 caches.open() 打开对应缓存空间。
    caches.open('my-test-cache-v1').then(function (cache) {
      // 通过 cache 缓存对象的 addAll 方法添加 precache 缓存
      return cache.addAll([
        '/',
        '/index.html',
        'static/js/vendor.dll.js?v=0506',
        'static/js/main.d663cbb081132e6928b9.js'
      ]);
    })
  );
});
