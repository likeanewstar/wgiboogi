/* Native DOM 유지. 요소 생성/복제/이동/링크 변경 없음. */
(() => {
 const init = () => {
  const body = document.body;
  // 공개 전에는 관리자 미리보기에서만 활성화한다.
  if (!body || !body.querySelector('a[href*="PREVIEW_MODE.closePreviewMode"]')) return;
  body.classList.add('wg-native-chrome');
  const header = body.querySelector('#doz_header_wrap');
  // 기존 메뉴/계정 노드는 유지하고 신규 시안의 소개 영역만 보완한다.
  const menu = body.querySelector('#mobile_slide_menu .viewport-nav.mobile');
  if (menu && !menu.querySelector('.wg-native-menu-intro')) {
    const intro = document.createElement('div');
    intro.className = 'wg-native-menu-intro';
    const copy = document.createElement('div');
    const label = document.createElement('p');
    label.className = 'wg-native-intro-label';
    label.textContent = 'Explore WgiBoogi World';
    const text = document.createElement('p');
    text.className = 'wg-native-intro-text';
    text.append('책과 기록, 지식을', document.createElement('br'), '나만의 시스템으로 쌓아가는 공간');
    copy.append(label, text);
    intro.append(copy);
    // 운영에서는 업로드한 캐릭터 URL을 설정. 로컬 URL은 미리보기 HTML에서만 지정한다.
    const characterUrl = 'https://cdn.imweb.me/upload/S201902035c568030c4a3c/d1e3652614ec7.png';
    if (characterUrl) {
      const character = document.createElement('img');
      character.className = 'wg-native-intro-character';
      character.alt = '';
      character.setAttribute('aria-hidden', 'true');
      character.src = characterUrl;
      character.addEventListener('error', () => character.remove(), { once: true });
      intro.append(character);
    }
    menu.prepend(intro);
  }
  if (!header || header.dataset.wgNativeBound) return;
  header.dataset.wgNativeBound = '1';
  let queued = false;
  const update = () => { header.classList.toggle('wg-native-scrolled', window.scrollY > 40); queued = false; };
  window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, {passive:true});
  update();
 };
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
 else init();
})();
