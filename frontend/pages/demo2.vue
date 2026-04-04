<template>
  <div v-html="htmlContent" />
</template>

<script setup>
const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>AI员工帮你建网站 - Demo 2</title>
  <script src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/tailwindcss/3.0.23/tailwind.min.js"><\/script>
  <link href="https://fonts.loli.net/css2?family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet">
  <link href="https://fonts.loli.net/css2?family=Noto+Sans+SC:wght@300;400;700;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Noto Sans SC', 'Inter', sans-serif; background: #000; color: #fff; overflow: hidden; }
    .slides-container { width: 100vw; height: 100vh; position: relative; }
    .slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%); opacity: 0; pointer-events: none; transition: opacity 0.5s ease; }
    .slide.active { opacity: 1; pointer-events: auto; }
    .slide.active .fade-up { animation: fadeUp 0.6s ease forwards; }
    .slide.active .fade-in { animation: fadeIn 0.5s ease forwards; }
    .slide.active .scale-in { animation: scaleIn 0.5s ease forwards; }
    .slide.active .slide-left { animation: slideLeft 0.5s ease forwards; }
    .slide.active .slide-right { animation: slideRight 0.5s ease forwards; }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
    @keyframes slideLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes slideRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
    .delay-1 { animation-delay: 0.1s !important; }
    .delay-2 { animation-delay: 0.2s !important; }
    .delay-3 { animation-delay: 0.3s !important; }
    .delay-4 { animation-delay: 0.4s !important; }
    .delay-5 { animation-delay: 0.5s !important; }
    .delay-6 { animation-delay: 0.6s !important; }
    .light-spot { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.4; pointer-events: none; }
    .spot-blue { width: 300px; height: 300px; background: #3b82f6; top: -100px; right: -100px; animation: float1 20s ease-in-out infinite; }
    .spot-purple { width: 250px; height: 250px; background: #8b5cf6; bottom: -80px; left: -80px; animation: float2 25s ease-in-out infinite; }
    .spot-cyan { width: 200px; height: 200px; background: #06b6d4; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: float3 18s ease-in-out infinite; }
    .spot-pink { width: 280px; height: 280px; background: #ec4899; top: -80px; left: -80px; animation: float2 22s ease-in-out infinite; }
    .spot-green { width: 220px; height: 220px; background: #10b981; bottom: -60px; right: -60px; animation: float1 24s ease-in-out infinite; }
    .spot-orange { width: 200px; height: 200px; background: #f59e0b; top: 30%; right: -60px; animation: float3 20s ease-in-out infinite; }
    @keyframes float1 { 0%, 100% { transform: translate(0, 0); } 25% { transform: translate(-50px, 30px); } 50% { transform: translate(30px, 50px); } 75% { transform: translate(50px, -20px); } }
    @keyframes float2 { 0%, 100% { transform: translate(0, 0); } 33% { transform: translate(40px, -40px); } 66% { transform: translate(-30px, 30px); } }
    @keyframes float3 { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.3); } }
    .slide-content { position: relative; z-index: 10; text-align: center; width: 100%; max-width: 500px; }
    .progress-bar { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 100; }
    .progress-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.3); cursor: pointer; transition: all 0.3s; }
    .progress-dot.active { background: #fff; transform: scale(1.3); }
    .page-number { position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%); font-size: 0.875rem; color: rgba(255,255,255,0.4); z-index: 100; }
    .feature-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 1rem; padding: 1rem; margin-bottom: 0.75rem; text-align: left; }
    .feature-card .title { font-size: 1rem; font-weight: 700; margin-bottom: 0.25rem; }
    .feature-card .desc { font-size: 0.85rem; color: #9ca3af; font-weight: 300; }
    .client-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 1rem; padding: 0.875rem; display: flex; align-items: center; gap: 0.75rem; }
    .compare-box { border-radius: 1rem; padding: 1rem; }
    .compare-box-red { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); }
    .compare-box-green { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); }
    .tag { display: inline-block; padding: 0.25rem 1rem; background: rgba(255,255,255,0.1); border-radius: 9999px; font-size: 0.875rem; color: #9ca3af; margin-bottom: 1rem; }
    .divider { width: 60px; height: 3px; background: linear-gradient(90deg, #3b82f6, #8b5cf6); margin: 1rem auto; border-radius: 2px; }
    .gradient-text { background: linear-gradient(135deg, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  </style>
</head>
<body>
  <div class="slides-container" id="slidesContainer">
    <div class="slide active" data-index="0">
      <div class="light-spot spot-blue"></div>
      <div class="light-spot spot-purple"></div>
      <div class="slide-content">
        <div class="scale-in delay-1" style="font-size: 4rem; margin-bottom: 1.5rem;">🚀</div>
        <h1 class="fade-up delay-2 text-4xl font-black mb-4 leading-tight">AI员工<br>帮你建网站</h1>
        <div class="fade-in delay-3 divider"></div>
        <p class="fade-up delay-4 text-xl font-light text-gray-400">说话就能改 · 效率提升10倍</p>
      </div>
    </div>
    <div class="slide" data-index="1">
      <div class="light-spot spot-pink"></div>
      <div class="light-spot spot-cyan"></div>
      <div class="slide-content">
        <span class="tag fade-in delay-1">痛点</span>
        <h2 class="fade-up delay-2 text-3xl font-bold mb-2">你的烦恼</h2>
        <p class="fade-in delay-3 text-gray-500 mb-5">传统建站的困境</p>
        <div class="space-y-3">
          <div class="feature-card slide-left delay-3"><div class="title">💸 改一次收一次钱</div><div class="desc">请人做网站，每次修改都要额外付费</div></div>
          <div class="feature-card slide-left delay-4"><div class="title">🤷 无从下手</div><div class="desc">想调整排版、换Logo，不知道找谁</div></div>
          <div class="feature-card slide-left delay-5"><div class="title">⏰ 维护周期长</div><div class="desc">小问题也要等好几天</div></div>
        </div>
      </div>
    </div>
    <div class="slide" data-index="2">
      <div class="light-spot spot-green"></div>
      <div class="light-spot spot-blue"></div>
      <div class="slide-content">
        <span class="tag fade-in delay-1" style="background: rgba(16, 185, 129, 0.2); color: #10b981;">解决方案</span>
        <h2 class="fade-up delay-2 text-3xl font-bold mb-2 gradient-text">✨ AI员工来了</h2>
        <p class="fade-in delay-3 text-gray-500 mb-5">微信/飞书发消息，网站自动改</p>
        <div class="scale-in delay-4" style="font-size: 4rem; margin-bottom: 1.5rem;">💬</div>
        <p class="fade-up delay-5 text-xl font-light text-gray-300">你说什么</p>
        <p class="fade-up delay-6 text-2xl font-bold mt-2 gradient-text">它做什么</p>
      </div>
    </div>
    <div class="slide" data-index="3">
      <div class="light-spot spot-purple"></div>
      <div class="light-spot spot-orange"></div>
      <div class="slide-content">
        <span class="tag fade-in delay-1" style="background: rgba(139, 92, 246, 0.2); color: #8b5cf6;">核心能力</span>
        <h2 class="fade-up delay-2 text-3xl font-bold mb-5 gradient-text">💡 5大功能</h2>
        <div class="space-y-2">
          <div class="feature-card slide-right delay-2"><div class="title">📐 改排版 — <span class="text-gray-400 font-normal">描述效果，分分钟呈现</span></div></div>
          <div class="feature-card slide-right delay-3"><div class="title">🎨 换Logo — <span class="text-gray-400 font-normal">上传新Logo，自动替换</span></div></div>
          <div class="feature-card slide-right delay-4"><div class="title">🖼️ 生配图 — <span class="text-gray-400 font-normal">描述需求，AI生成图片</span></div></div>
          <div class="feature-card slide-right delay-5"><div class="title">🎭 仿风格 — <span class="text-gray-400 font-normal">发个链接，照着风格做</span></div></div>
          <div class="feature-card slide-right delay-6"><div class="title">📝 加内容 — <span class="text-gray-400 font-normal">告诉AI，自动更新上线</span></div></div>
        </div>
      </div>
    </div>
    <div class="slide" data-index="4">
      <div class="light-spot spot-blue"></div>
      <div class="light-spot spot-green"></div>
      <div class="slide-content">
        <span class="tag fade-in delay-1">效率革命</span>
        <h2 class="fade-up delay-2 text-3xl font-bold mb-6 gradient-text">⏱️ 效率提升10倍</h2>
        <div class="grid grid-cols-2 gap-3 w-full">
          <div class="compare-box compare-box-red slide-left delay-3"><p class="text-red-400 font-bold mb-2">❌ 传统方式</p><p class="text-sm text-gray-400 mb-1">修改一次等3-7天</p><p class="text-sm text-gray-400 mb-1">请人改版费用高</p><p class="text-sm text-gray-400">一周出一个网站</p></div>
          <div class="compare-box compare-box-green slide-right delay-4"><p class="text-green-400 font-bold mb-2">✅ AI员工</p><p class="text-sm text-gray-300 mb-1">分分钟搞定</p><p class="text-sm text-gray-300 mb-1">随时改零额外成本</p><p class="text-sm text-gray-300">1小时做出网站</p></div>
        </div>
      </div>
    </div>
    <div class="slide" data-index="5">
      <div class="light-spot spot-pink"></div>
      <div class="light-spot spot-purple"></div>
      <div class="slide-content">
        <span class="tag fade-in delay-1">目标客户</span>
        <h2 class="fade-up delay-2 text-3xl font-bold mb-5 gradient-text">🎯 适合谁用？</h2>
        <div class="space-y-3">
          <div class="client-card slide-right delay-3"><span class="text-3xl">🏪</span><div class="text-left"><p class="font-bold">实体店主</p><p class="text-sm text-gray-500">没有技术团队，想展示产品</p></div></div>
          <div class="client-card slide-right delay-4"><span class="text-3xl">🏢</span><div class="text-left"><p class="font-bold">中小企业</p><p class="text-sm text-gray-500">需要官网，不想花大价钱维护</p></div></div>
          <div class="client-card slide-right delay-5"><span class="text-3xl">📱</span><div class="text-left"><p class="font-bold">个体创业者</p><p class="text-sm text-gray-500">快速搭建个人品牌网站</p></div></div>
          <div class="client-card slide-right delay-6"><span class="text-3xl">🛒</span><div class="text-left"><p class="font-bold">电商玩家</p><p class="text-sm text-gray-500">随时更新促销页面</p></div></div>
        </div>
      </div>
    </div>
    <div class="slide" data-index="6">
      <div class="light-spot spot-blue"></div>
      <div class="light-spot spot-purple"></div>
      <div class="light-spot spot-cyan"></div>
      <div class="slide-content">
        <div class="scale-in delay-1" style="font-size: 4rem; margin-bottom: 1.5rem;">🌟</div>
        <h2 class="fade-up delay-2 text-3xl font-black mb-2 text-gray-400">别人一周</h2>
        <h2 class="fade-up delay-3 text-4xl font-black mb-5 gradient-text">你1小时</h2>
        <div class="fade-in delay-4 divider"></div>
        <p class="fade-up delay-5 text-xl font-bold mb-4">想让网站"听你的话"？</p>
        <p class="fade-up delay-6 text-lg font-light text-gray-400">找AI员工就够了</p>
      </div>
    </div>
  </div>
  <div class="progress-bar" id="progressBar"></div>
  <div class="page-number" id="pageNumber">1 / 7</div>
  <script>
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.getElementById('progressBar');
    const pageNumber = document.getElementById('pageNumber');
    let currentSlide = 0;
    slides.forEach((_, i) => { const d = document.createElement('div'); d.className = 'progress-dot' + (i === 0 ? ' active' : ''); d.onclick = () => goToSlide(i); progressBar.appendChild(d); });
    function updateUI() { document.querySelectorAll('.progress-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide)); pageNumber.textContent = (currentSlide + 1) + ' / ' + slides.length; }
    function goToSlide(i) { if (i === currentSlide || i < 0 || i >= slides.length) return; slides[currentSlide].classList.remove('active'); slides[i].classList.add('active'); currentSlide = i; updateUI(); }
    document.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goToSlide(currentSlide + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); goToSlide(currentSlide - 1); } });
    let touchStartX = 0; document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    document.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - touchStartX; if (Math.abs(d) > 50) { d < 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1); } });
  <\/script>
</body>
</html>
`
</script>
