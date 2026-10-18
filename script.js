
(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const topics = {
    me: {
      emoji: "🌷",
      title: "Gửi Mẹ — Người giữ lửa yêu thương",
      body: "Mẹ à, có những yêu thương đôi khi con chưa biết nói thành lời. Cảm ơn mẹ vì những chăm sóc âm thầm, những lần lo lắng và vòng tay luôn khiến con thấy bình yên.\\n\\nMong mẹ luôn mạnh khỏe, an vui, có nhiều thời gian dành cho chính mình và luôn biết rằng mẹ được yêu thương nhiều hơn những gì lời nói có thể diễn tả. Chúc mẹ một ngày 20/10 thật ấm áp — và thật nhiều ngày bình yên sau đó."
    },
    teacher: {
      emoji: "📚",
      title: "Gửi cô giáo — Người gieo mầm ước mơ",
      body: "Kính chúc cô một ngày 20/10 thật nhiều niềm vui và yêu thương. Cảm ơn cô không chỉ vì những bài học, mà còn vì sự kiên nhẫn, niềm tin và nguồn cảm hứng cô trao cho học trò.\\n\\nMong hành trình gieo mầm tri thức của cô luôn có thật nhiều nụ cười, những điều tốt đẹp và những thành quả khiến cô tự hào."
    },
    friend: {
      emoji: "🫶",
      title: "Gửi người bạn luôn đáng quý",
      body: "Chúc bạn nữ của mình luôn vui vẻ, bình an và gặp nhiều điều tử tế. Cảm ơn vì đã cùng chia sẻ những câu chuyện nhỏ, những tiếng cười và cả những ngày không dễ dàng.\\n\\nMong bạn luôn được là chính mình, có đủ dũng khí theo đuổi điều mình muốn và luôn nhớ rằng bạn xứng đáng với những tình bạn chân thành."
    },
    special: {
      emoji: "💌",
      title: "Gửi một người đặc biệt",
      body: "Gửi bạn — người khiến những điều bình thường đôi khi trở nên đáng nhớ. Nhân ngày 20/10, mong bạn luôn có thật nhiều lý do để mỉm cười, có người lắng nghe khi cần và có can đảm để chọn điều làm trái tim mình hạnh phúc.\\n\\nChúc bạn được yêu thương không chỉ hôm nay, mà cả trong những ngày rất đỗi bình thường."
    },
    women: {
      emoji: "🌟",
      title: "Gửi những người phụ nữ tuyệt vời",
      body: "Bạn không cần phải hoàn hảo để trở nên tuyệt vời. Sự mạnh mẽ, lòng tử tế, cá tính, những ước mơ và cả những lần bắt đầu lại đều làm nên vẻ đẹp riêng của bạn.\\n\\nChúc bạn luôn có tự do để lựa chọn, can đảm để tiến bước, bình yên để nghỉ ngơi và những người biết trân trọng con người thật của bạn. Hãy tỏa sáng theo cách của riêng mình."
    },
    unsaid: {
      emoji: "✉️",
      title: "Điều chưa kịp nói",
      body: "Có thể trong những ngày bận rộn, chúng ta quên nói lời cảm ơn, quên hỏi nhau có ổn không, hoặc nghĩ rằng người mình thương đã tự hiểu.\\n\\nVậy nên hôm nay, xin gửi bạn một lời nhắc nhỏ: sự hiện diện của bạn có ý nghĩa. Những nỗ lực của bạn đáng được ghi nhận. Bạn xứng đáng được nghỉ ngơi, được tôn trọng và được yêu thương — không cần phải làm điều gì để chứng minh điều đó."
    },
    garden: {
      emoji: "🌸",
      title: "Vườn hoa lời chúc",
      body: "🌷 Chúc bạn luôn bình an trong lòng và rạng rỡ trên môi.\\n🌸 Mong những điều tử tế tìm đến bạn đúng lúc.\\n🌼 Chúc bạn có sức khỏe, niềm vui và những ước mơ đang dần thành hình.\\n🌺 Mong bạn luôn được lắng nghe, tôn trọng và yêu thương.\\n💗 Chúc mừng ngày 20/10 — hãy dịu dàng với chính mình nữa nhé!"
    }
  };

  const modal = $("#modal");
  let lastFocus = null;

  function openTopic(key) {
    const topic = topics[key];
    if (!topic) return;

    lastFocus = document.activeElement;
    $("#modalEmoji").textContent = topic.emoji;
    $("#modalTitle").textContent = topic.title;
    $("#modalBody").textContent = topic.body.replace(/\\n/g, "\n");

    modal.classList.add("open");
    $("#closeModal").focus();

    tone(620, .07);
    burst(window.innerWidth / 2, window.innerHeight / 2, 12);
  }

  function closeModal() {
    modal.classList.remove("open");
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll("[data-topic]").forEach(node => {
    node.addEventListener("click", () => openTopic(node.dataset.topic));

    node.addEventListener("pointermove", e => {
      if (reducedMotion || e.pointerType !== "mouse" || window.innerWidth < 761) return;

      const r = node.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;

      node.style.transform =
        `translate(-50%,-50%) perspective(500px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.07)`;
    });

    node.addEventListener("pointerleave", () => node.style.removeProperty("transform"));
    node.addEventListener("pointerenter", () => {
      if (!reducedMotion) tone(760, .025);
    });
  });

  $("#closeModal").addEventListener("click", closeModal);

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  $(".signature").addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });

  // Âm thanh tạo trực tiếp bằng Web Audio API.
  let audioCtx = null;
  let musicOn = false;
  let musicTimer = null;
  let noteIndex = 0;

  const notes = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23];

  function tone(freq = 660, duration = .06, volume = .025) {
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  $("#musicBtn").addEventListener("click", async () => {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();

      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
      }

      musicOn = !musicOn;
      $("#musicBtn").classList.toggle("playing", musicOn);
      $("#musicBtn").setAttribute("aria-pressed", String(musicOn));
      $("#musicLabel").textContent = musicOn ? "Tắt nhạc yêu thương" : "Bật nhạc yêu thương";

      if (musicTimer) clearInterval(musicTimer);

      if (musicOn) {
        tone(notes[0], .45, .018);

        musicTimer = setInterval(() => {
          if (musicOn) {
            tone(notes[noteIndex % notes.length], .42, .014);
            noteIndex++;
          }
        }, 520);
      }
    } catch (e) {
      showToast("Trình duyệt chưa hỗ trợ âm thanh Web Audio.");
    }
  });

  // Thông báo và hạt sáng.
  const toast = $("#toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function burst(x, y, count = 8) {
    if (reducedMotion) return;

    const symbols = ["✦", "♡", "✧", "✨"];

    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");

      s.className = "spark";
      s.textContent = symbols[i % symbols.length];
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.setProperty("--dx", (Math.random() * 180 - 90) + "px");
      s.style.setProperty("--dy", (Math.random() * -150 - 15) + "px");

      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
    }
  }

  // Gửi lời chúc vào trái tim.
  $("#wishForm").addEventListener("submit", e => {
    e.preventDefault();

    const input = $("#wishInput");
    const message = input.value.trim();

    if (!message) {
      showToast("Bạn hãy viết một lời chúc trước nhé.");
      input.focus();
      return;
    }

    const chip = document.createElement("div");
    chip.className = "wish-chip";

    const heart = document.createElement("span");
    heart.textContent = "♡ ";

    chip.append(heart, document.createTextNode(message));
    $("#wishList").prepend(chip);

    const rect = $("#heartCenter").getBoundingClientRect();

    burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
    tone(880, .18, .035);

    input.value = "";
    showToast("Lời chúc đã bay vào trái tim yêu thương!");
  });

  // Vẽ thiệp chúc mừng trên Canvas.
  const canvas = $("#cardCanvas");
  const ctx = canvas.getContext("2d");

  function drawCard(name, sender, message) {
    const w = canvas.width;
    const h = canvas.height;

    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#fff8f2");
    g.addColorStop(.48, "#fbe0f0");
    g.addColorStop(1, "#dce8ff");

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalAlpha = .18;

    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.ellipse(
        (i % 4) * 370 + 50,
        Math.floor(i / 4) * 280 + 70,
        70, 130, i * .5, 0, Math.PI * 2
      );

      ctx.fillStyle = i % 2 ? "#e45e9f" : "#a879d5";
      ctx.fill();
    }

    ctx.restore();

    ctx.strokeStyle = "#c58baf";
    ctx.lineWidth = 3;
    ctx.strokeRect(34, 34, w - 68, h - 68);

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(46, 46, w - 92, h - 92);

    ctx.textAlign = "center";
    ctx.fillStyle = "#b64e8d";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText("20 . 10  ·  NGÀY PHỤ NỮ VIỆT NAM", w / 2, 115);

    ctx.fillStyle = "#854276";
    ctx.font = "italic 64px Georgia,serif";
    ctx.fillText("Gửi " + name, w / 2, 225);

    ctx.fillStyle = "#d64f96";
    ctx.font = "56px serif";
    ctx.fillText("♡  ✿  ♡", w / 2, 305);

    ctx.fillStyle = "#67476b";
    ctx.font = "30px sans-serif";

    const words = message.split(/\s+/);
    const lines = [];
    let line = "";

    for (const word of words) {
      const test = line ? line + " " + word : word;

      if (ctx.measureText(test).width > 850 && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }

    if (line) lines.push(line);

    const shown = lines.slice(0, 4);

    shown.forEach((l, i) => {
      ctx.fillText(l, w / 2, 390 + i * 48);
    });

    ctx.fillStyle = "#a04d87";
    ctx.font = "italic 32px Georgia,serif";
    ctx.fillText("Thân gửi, " + (sender || "Một người thương mến"), w / 2, 625);

    ctx.fillStyle = "#b34b8a";
    ctx.font = "30px sans-serif";
    ctx.fillText("✧ Mong những điều dịu dàng luôn tìm đến bạn ✧", w / 2, 690);
  }

  $("#cardForm").addEventListener("submit", e => {
    e.preventDefault();

    const name = $("#recipient").value.trim();
    const message = $("#cardMessage").value.trim();
    const sender = $("#sender").value.trim();

    if (!name || !message) {
      showToast("Hãy nhập tên người nhận và lời chúc nhé.");
      return;
    }

    drawCard(name, sender, message);

    canvas.classList.remove("hidden");
    $("#downloadWrap").classList.remove("hidden");

    showToast("Thiệp của bạn đã sẵn sàng 🌷");

    canvas.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center"
    });
  });

  $("#downloadBtn").addEventListener("click", () => {
    try {
      const a = document.createElement("a");

      a.download = "thiep-20-10-xuan-tin.png";
      a.href = canvas.toDataURL("image/png");
      a.click();

      showToast("Đã tạo ảnh thiệp PNG.");
    } catch (e) {
      showToast("Không thể xuất ảnh trên trình duyệt này.");
    }
  });

  // Canvas nền: cánh hoa và hạt sáng.
  const sky = $("#sky");
  const sctx = sky.getContext("2d");

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.7);
    width = window.innerWidth;
    height = window.innerHeight;

    sky.width = Math.floor(width * dpr);
    sky.height = Math.floor(height * dpr);
    sky.style.width = width + "px";
    sky.style.height = height + "px";

    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(85, Math.max(28, Math.floor(width / 17)));

    particles = Array.from(
      { length: count },
      () => makeParticle(true)
    );
  }

  function makeParticle(randomY = false) {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 20,
      size: Math.random() * 4 + 1.3,
      speed: Math.random() * .65 + .18,
      drift: Math.random() * 1.2 - .6,
      phase: Math.random() * Math.PI * 2,
      alpha: Math.random() * .45 + .18,
      petal: Math.random() > .58,
      rot: Math.random() * 6.28,
      spin: (Math.random() - .5) * .025
    };
  }

  let last = 0;

  function animate(time) {
    if (!document.hidden) {
      const delta = Math.min((time - last) / 16.67 || 1, 2);
      last = time;

      sctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.phase += .012 * delta;
        p.y += (reducedMotion ? p.speed * .15 : p.speed) * delta;
        p.x += (p.drift + Math.sin(p.phase) * .35) * delta;
        p.rot += p.spin * delta;

        if (p.y > height + 15 || p.x < -20 || p.x > width + 20) {
          Object.assign(p, makeParticle(false));
          p.x = Math.random() * width;
        }

        sctx.save();
        sctx.translate(p.x, p.y);
        sctx.rotate(p.rot);
        sctx.globalAlpha = p.alpha;

        if (p.petal) {
          sctx.fillStyle = "#fff3fa";
          sctx.beginPath();
          sctx.ellipse(0, 0, p.size * .75, p.size * 1.6, 0, 0, Math.PI * 2);
          sctx.fill();
        } else {
          sctx.fillStyle = "#fff";
          sctx.shadowBlur = 12;
          sctx.shadowColor = "#fff";
          sctx.beginPath();
          sctx.arc(0, 0, p.size * .6, 0, Math.PI * 2);
          sctx.fill();
        }

        sctx.restore();
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  requestAnimationFrame(animate);
})();
