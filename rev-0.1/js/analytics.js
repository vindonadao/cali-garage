/* ==========================================================
   CALI GARAGE — Analytics (rev-0.11)

   GA4 com Consent Mode v2 e banner de consentimento LGPD.
   Tudo em arquivo externo de propósito: a CSP não tem
   'unsafe-inline' em script-src desde a rev-0.10.1, e não vale
   reabrir essa porta por causa de tracking.

   Enquanto GA_ID estiver vazio, NADA acontece: sem banner, sem
   cookie, sem requisição. É seguro estar em produção assim.
   Para ativar, basta preencher o Measurement ID abaixo.
   ========================================================== */
(function () {
  var GA_ID = 'G-33VMGDZ8BQ';           // GA4 da conta do cliente
  var CHAVE = 'cg-consent';             // 'granted' | 'denied'

  if (!GA_ID) return;

  var dl = (window.dataLayer = window.dataLayer || []);
  function gtag() { dl.push(arguments); }
  window.gtag = gtag;

  function lido() {
    try { return localStorage.getItem(CHAVE); } catch (e) { return null; }
  }
  function grava(v) {
    try { localStorage.setItem(CHAVE, v); } catch (e) {}
  }

  // LGPD é opt-in de verdade: Consent Mode BÁSICO, não avançado.
  // No modo avançado o gtag.js carrega com storage negado e ainda manda
  // pings sem cookie para o Google, que carregam IP. Aqui o script só é
  // injetado depois do "Aceitar": antes disso não sai uma requisição.
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });

  var carregado = false;

  function carregaGtag() {
    if (carregado) return;
    carregado = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function concede() {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    carregaGtag();
  }

  if (lido() === 'granted') concede();

  // ---------- Banner ----------
  function fechaBanner() {
    var b = document.getElementById('cookie-banner');
    if (b) b.parentNode.removeChild(b);
  }

  function mostraBanner() {
    if (document.getElementById('cookie-banner')) return;
    var b = document.createElement('div');
    b.id = 'cookie-banner';
    b.className = 'cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Aviso de cookies');

    var txt = document.createElement('p');
    txt.innerHTML = 'Usamos cookies só para entender como o site é usado. ' +
      'Nada de anúncios. <a href="./privacidade.html">Política de Privacidade</a>.';

    var acoes = document.createElement('div');
    acoes.className = 'cookie-banner-acoes';

    var recusar = document.createElement('button');
    recusar.type = 'button';
    recusar.className = 'cookie-btn cookie-btn-ghost';
    recusar.textContent = 'Recusar';
    recusar.addEventListener('click', function () {
      grava('denied');
      fechaBanner();
    });

    var aceitar = document.createElement('button');
    aceitar.type = 'button';
    aceitar.className = 'cookie-btn cookie-btn-primary';
    aceitar.textContent = 'Aceitar';
    aceitar.addEventListener('click', function () {
      grava('granted');
      concede();
      fechaBanner();
    });

    acoes.appendChild(recusar);
    acoes.appendChild(aceitar);
    b.appendChild(txt);
    b.appendChild(acoes);
    document.body.appendChild(b);
  }

  // Link "Cookies" no rodapé, para reabrir a escolha depois.
  function ligaLinkRodape() {
    var alvo = document.querySelector('.site-footer a[href$="privacidade.html"]');
    if (!alvo || document.getElementById('reabrir-cookies')) return;
    var sep = document.createTextNode(' · ');
    var a = document.createElement('a');
    a.id = 'reabrir-cookies';
    a.href = '#';
    a.textContent = 'Cookies';
    a.addEventListener('click', function (e) {
      e.preventDefault();
      mostraBanner();
    });
    alvo.parentNode.insertBefore(sep, alvo.nextSibling);
    alvo.parentNode.insertBefore(a, sep.nextSibling);
  }

  // ---------- Conversão ----------
  // O WhatsApp é a única conversão do site. O clique é delegado no
  // document porque os CTAs mudam de href conforme o horário.
  function ligaEventos() {
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (!carregado) return;
      if (href.indexOf('wa.me') !== -1) {
        gtag('event', 'generate_lead', {
          method: 'whatsapp',
          link_text: (a.textContent || '').trim().slice(0, 60),
          page_location: location.href
        });
      } else if (href.indexOf('tel:') === 0) {
        gtag('event', 'generate_lead', { method: 'phone' });
      }
    }, true);
  }

  function inicia() {
    if (!lido()) mostraBanner();
    ligaLinkRodape();
    ligaEventos();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicia);
  } else {
    inicia();
  }
})();
