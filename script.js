'use strict';

/* ===== TIỆN ÍCH ===== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const rand = (min, max) => Math.random() * (max - min) + min;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Bật lớp "js" để CSS biết có thể ẩn phần tử chờ hiệu ứng cuộn
document.documentElement.classList.add('js');

/* Thông báo nhỏ (toast) thay cho alert() */
const toastEl = $('#toast');
let toastTimer;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

/* ===== DỮ LIỆU: 12 LỜI CHÚC TRONG VƯỜN HOA ===== */
const WISHES = [
  { to: 'Dành cho mẹ', text: 'Mẹ ơi, cảm ơn mẹ vì những bữa cơm, những cái ôm và cả những lần mẹ lặng lẽ lo cho con. Chúc mẹ luôn khỏe mạnh, và nhớ dành thời gian cho những niềm vui của riêng mình nhé.' },
  { to: 'Dành cho mẹ', text: 'Con biết mẹ cũng từng có những ước mơ của riêng mình. Nhân ngày 20/10, con chúc mẹ có thêm thời gian làm điều mẹ thích, và luôn biết rằng con tự hào về mẹ.' },
  { to: 'Dành cho cô giáo', text: 'Cảm ơn cô đã kiên nhẫn với từng câu hỏi và từng lỗi sai của chúng em. Bài học của cô không chỉ nằm trong sách vở mà còn theo em suốt cuộc đời. Chúc cô thật nhiều sức khỏe và niềm vui.' },
  { to: 'Dành cho cô giáo', text: 'Có những ngọn đèn không ồn ào nhưng soi sáng cả một hành trình, và cô là một ngọn đèn như thế. Chúc cô một ngày 20/10 ấm áp, luôn được học trò nhớ về với lòng biết ơn.' },
  { to: 'Dành cho bạn bè', text: 'Cảm ơn bạn vì đã lắng nghe mình cả những lúc mình chẳng biết nói gì. Chúc bạn luôn tự tin theo đuổi điều mình yêu và có thật nhiều ngày cười thật tươi.' },
  { to: 'Dành cho bạn bè', text: 'Chúc bạn một ngày 20/10 nhẹ nhàng: ít deadline, nhiều cà phê ngon và những cuộc trò chuyện khiến bạn thấy được là chính mình.' },
  { to: 'Dành cho chị em', text: 'Chúc chị em mình luôn là chỗ dựa của nhau, cùng bay thật xa nhưng vẫn biết đường về bên nhau nhé.' },
  { to: 'Dành cho chị em', text: 'Cảm ơn vì đã cùng nhau lớn lên, chia nhau từng bí mật và từng niềm vui. Chúc chị em mình luôn mạnh mẽ và được sống đúng với bản thân.' },
  { to: 'Gửi mọi phụ nữ', text: 'Chúc bạn có đủ bình yên để nghỉ ngơi và đủ dũng cảm để bắt đầu những điều mới.' },
  { to: 'Gửi mọi phụ nữ', text: 'Bạn không cần phải hoàn hảo mới xứng đáng được yêu thương. Chúc bạn một ngày 20/10 thật nhẹ lòng.' },
  { to: 'Gửi mọi phụ nữ', text: 'Chúc mọi ước mơ của bạn đều được trân trọng, dù lớn hay nhỏ, dù đã bắt đầu hay vẫn đang chờ ngày nở.' },
  { to: 'Gửi mọi phụ nữ', text: 'Cảm ơn sự dịu dàng của bạn. Và mong bạn biết rằng dịu dàng cũng là một cách mạnh mẽ.' }
];
const FLOWER_COLORS = ['#e98ba0', '#c4566f', '#d9a441', '#f2a9b6', '#791D37', '#e6788f'];

/* ===== HIỆU ỨNG NỀN: CÁNH HOA, HẠT SÁNG, TRÁI TIM ===== */
function spawn(container, className, count, setup) {
  if (!container || reduceMotion) return; // Người dùng giảm chuyển động thì bỏ qua
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = className;
    setup(el);
    container.appendChild(el);
  }
}
spawn($('#petals'), 'petal', 14, el => {
  el.style.setProperty('--l', rand(0, 100) + '%');
  el.style.setProperty('--s', rand(10, 20) + 'px');
  el.style.setProperty('--t', rand(10, 18) + 's');
  el.style.setProperty('--dl', -rand(0, 14) + 's');
  el.style.setProperty('--x', rand(-120, 120) + 'px');
});
const sparkSetup = el => {
  el.style.setProperty('--x', rand(2, 98) + '%');
  el.style.setProperty('--y', rand(2, 98) + '%');
  el.style.setProperty('--s', rand(3, 6) + 'px');
  el.style.setProperty('--t', rand(2.5, 5) + 's');
  el.style.setProperty('--dl', -rand(0, 5) + 's');
};
spawn($('#heroSparks'), 'spark', 18, sparkSetup);
spawn($('#finaleFx'), 'spark', 14, sparkSetup);
spawn($('#finaleFx'), 'heart', 9, el => {
  el.textContent = '♥';
  el.style.setProperty('--x', rand(3, 95) + '%');
  el.style.setProperty('--s', rand(14, 28) + 'px');
  el.style.setProperty('--t', rand(7, 12) + 's');
  el.style.setProperty('--dl', -rand(0, 10) + 's');
});

/* ===== HIỆN DẦN KHI CUỘN TỚI ===== */
// Các đoạn trong [data-stagger] hiện lần lượt theo thứ tự (biến --i dùng làm độ trễ)
$$('[data-stagger]').forEach(group => {
  [...group.children].forEach((child, i) => {
    child.classList.add('st');
    child.style.setProperty('--i', i);
  });
});
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      obs.unobserve(entry.target); // Mỗi phần tử chỉ hiện một lần
    }
  });
}, { threshold: 0.15 });
$$('.reveal').forEach(el => revealObserver.observe(el));

/* ===== MENU & NÚT QUAY LẠI ĐẦU TRANG ===== */
const menu = $('#menu');
const navToggle = $('#navToggle');
navToggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});
$('#toTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});

/* ===== PHẦN D: VƯỜN HOA & POPUP ===== */
const garden = $('#garden');
const modal = $('#modal');
const modalTo = $('#modalTo');
const modalText = $('#modalText');
const modalBox = $('#modalBox');
let currentWish = 0;
let lastFocused = null;

// Tạo 12 bông hoa từ mảng WISHES
WISHES.forEach((wish, i) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'bloom';
  btn.style.setProperty('--c', FLOWER_COLORS[i % FLOWER_COLORS.length]);
  btn.setAttribute('aria-label', `Mở lời chúc số ${i + 1}: ${wish.to.toLowerCase()}`);
  btn.innerHTML = '<svg aria-hidden="true"><use href="#flower"/></svg><span></span>';
  btn.lastChild.textContent = wish.to.replace('Dành cho ', '').replace('Gửi ', '');
  btn.addEventListener('click', () => openWish(i, btn));
  garden.appendChild(btn);
});

function renderWish(i) {
  currentWish = i;
  modalTo.textContent = WISHES[i].to;
  modalText.textContent = '“' + WISHES[i].text + '”';
  modalBox.style.animation = 'none';       // Khởi động lại hiệu ứng mỗi lần đổi lời chúc
  void modalBox.offsetWidth;
  modalBox.style.animation = reduceMotion ? 'none' : 'popIn .6s backwards';
}
function openWish(i, opener) {
  lastFocused = opener || document.activeElement;
  renderWish(i);
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  $('#modalClose').focus();
}
function closeWish() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  if (lastFocused) lastFocused.focus();
}
$('#modalClose').addEventListener('click', closeWish);
$('#modalNext').addEventListener('click', () => renderWish((currentWish + 1) % WISHES.length));
modal.addEventListener('click', e => { if (e.target === modal) closeWish(); }); // Bấm ra ngoài để đóng
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('show')) return;
  if (e.key === 'Escape') closeWish();
  if (e.key === 'Tab') { // Giữ phím Tab quay vòng trong popup
    const btns = $$('button', modal);
    const first = btns[0], last = btns[btns.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ===== PHẦN E: LÁ THƯ BÍ MẬT (mở / đóng được nhiều lần) ===== */
const env = $('#env');
const secret = $('#secret');
const envBtn = $('#envBtn');
envBtn.addEventListener('click', () => {
  const open = !env.classList.contains('open');
  env.classList.toggle('open', open);
  secret.classList.toggle('open', open);
  secret.setAttribute('aria-hidden', String(!open));
  envBtn.setAttribute('aria-expanded', String(open));
  envBtn.textContent = open ? 'Đóng thư' : 'Mở lá thư';
  if (open) {
    setTimeout(() => secret.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }), 950);
  }
});

/* ===== PHẦN F: TẠO LỜI CHÚC ===== */
// Mỗi đối tượng có: lời xưng hô (có tên / không tên) và các mẫu nội dung viết sẵn
const TEMPLATES = {
  'Mẹ': {
    hi: n => n ? `Gửi mẹ ${n} yêu quý` : 'Gửi mẹ yêu quý',
    bodies: [
      'Chúc mẹ ngày 20/10 luôn bình an, mạnh khỏe và có thật nhiều niềm vui. Mong mẹ luôn cảm nhận được tình yêu mà gia đình dành cho mẹ.',
      'Cảm ơn mẹ vì vòng tay luôn rộng mở. Chúc mẹ có thêm nhiều thời gian cho những điều mẹ thích và những ngày thật nhẹ lòng.'
    ]
  },
  'Cô giáo': {
    hi: n => n ? `Gửi cô ${n} kính mến` : 'Gửi cô kính mến',
    bodies: [
      'Cảm ơn cô đã tận tâm dìu dắt chúng em. Chúc cô ngày 20/10 thật nhiều sức khỏe, niềm vui và luôn được học trò nhớ về với lòng biết ơn.',
      'Những bài học của cô là ánh sáng theo em suốt hành trình. Chúc cô luôn bình an và hạnh phúc trong nghề, trong cuộc sống.'
    ]
  },
  'Bạn bè': {
    hi: n => n ? `Gửi ${n} thân mến` : 'Gửi người bạn thân mến',
    bodies: [
      'Cảm ơn bạn vì đã luôn ở bên và lắng nghe mình. Chúc bạn ngày 20/10 thật vui, tự tin theo đuổi ước mơ và luôn được là chính mình.',
      'Chúc bạn một ngày 20/10 nhẹ nhàng, nhiều tiếng cười và những điều tốt đẹp. Mong bạn luôn biết mình quý giá thế nào.'
    ]
  },
  'Chị em': {
    hi: n => n ? `Gửi ${n} thân thương` : 'Gửi chị em thân thương',
    bodies: [
      'Chúc chúng ta luôn là chỗ dựa của nhau, cùng mạnh mẽ, cùng bay xa và vẫn biết đường về bên nhau. Chúc mừng ngày 20/10!',
      'Cảm ơn vì đã cùng nhau lớn lên và chia nhau mọi điều. Chúc chị em mình luôn khỏe, luôn vui và sống đúng với chính mình.'
    ]
  },
  'Người phụ nữ đặc biệt': {
    hi: n => n ? `Gửi ${n} – người phụ nữ đặc biệt` : 'Gửi người phụ nữ đặc biệt',
    bodies: [
      'Chúc bạn ngày 20/10 thật dịu dàng. Mong bạn luôn có đủ bình yên để nghỉ ngơi và đủ dũng cảm để sống theo cách mình chọn.',
      'Cảm ơn bạn vì đã là chính mình. Chúc những ước mơ của bạn luôn được trân trọng và hành trình phía trước đầy ánh sáng.'
    ]
  }
};
const nameInput = $('#nameInput');
const audSelect = $('#audSelect');
const wishCard = $('#wishCard');
const copyBtn = $('#copyBtn');
const turn = {};       // Đếm lượt để mỗi lần bấm sẽ đổi sang mẫu khác
let wishPlain = '';    // Nội dung dạng chữ thường để sao chép

$('#genBtn').addEventListener('click', () => {
  const name = nameInput.value.trim().replace(/\s+/g, ' ');
  const aud = audSelect.value;
  const tpl = TEMPLATES[aud];
  if (!tpl) { showToast('Hãy chọn đối tượng nhận lời chúc nhé.'); return; }
  if (!name) showToast('Bạn chưa nhập tên nên mình dùng cách xưng hô mặc định nhé.');

  turn[aud] = ((turn[aud] ?? -1) + 1) % tpl.bodies.length;
  const hi = tpl.hi(name) + ',';
  const body = tpl.bodies[turn[aud]];
  wishPlain = `${hi}\n${body}\n— Chúc mừng Ngày Phụ nữ Việt Nam 20/10 —`;

  // Dùng textContent (không dùng innerHTML) để tên người dùng nhập vào luôn an toàn
  wishCard.innerHTML = '<p class="hi"></p><p class="body"></p><p class="end">20 . 10</p>';
  $('.hi', wishCard).textContent = hi;
  $('.body', wishCard).textContent = body;
  wishCard.classList.remove('fresh');
  void wishCard.offsetWidth;
  wishCard.classList.add('fresh');
  copyBtn.disabled = false;
});

// Sao chép: ưu tiên Clipboard API, dự phòng bằng execCommand cho trình duyệt cũ / chạy file trực tiếp
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) { /* chuyển sang cách dự phòng */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch (err) { return false; }
}
copyBtn.addEventListener('click', async () => {
  if (!wishPlain) { showToast('Hãy tạo lời chúc trước khi sao chép.'); return; }
  const ok = await copyText(wishPlain);
  showToast(ok ? 'Đã sao chép lời chúc ♡' : 'Không sao chép được. Bạn hãy bôi đen và sao chép thủ công nhé.');
});

/* ===== NHẠC NỀN (mặc định tắt, chỉ phát khi người dùng bấm) ===== */
const bgm = $('#bgm');
const musicBtn = $('#musicBtn');
function setMusicUI(on) {
  musicBtn.classList.toggle('on', on);
  musicBtn.setAttribute('aria-pressed', String(on));
  musicBtn.setAttribute('aria-label', on ? 'Tắt nhạc nền' : 'Bật nhạc nền');
}
musicBtn.addEventListener('click', async () => {
  if (!bgm.paused) { bgm.pause(); setMusicUI(false); return; }
  try {
    await bgm.play();
    setMusicUI(true);
  } catch (err) {
    setMusicUI(false);
    showToast('Chưa có file nhạc. Hãy thêm music/nhac-nen.mp3 để nghe nhạc nhé ♪');
  }
});