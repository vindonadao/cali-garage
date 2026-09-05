(function () {
  // ============================================
  // NAV TOGGLE / DROPDOWN
  // ============================================
  var btn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('primary-nav');

  function setOpen(open) {
    if (menu) menu.classList.toggle('is-open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (btn && menu) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!menu.classList.contains('is-open'));
    });

    menu.addEventListener('click', function (e) {
      var t = e.target;
      if (t && t.tagName === 'A') setOpen(false);
    });

    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (menu.contains(e.target)) return;
      if (btn.contains(e.target)) return;
      setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
      }
    });
  }

  // ============================================
  // FOOTER YEAR
  // ============================================
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ============================================
  // BUSINESS STATUS (rev-0.7 v6)
  // Aberto seg a sex, 7h30 às 12h e 14h às 18h (horário America/Sao_Paulo).
  // Fecha para o almoço entre 12h e 14h.
  // Fechado em sábado, domingo e feriados nacionais.
  // Feriados móveis (Páscoa, Carnaval, Sexta Santa, Corpus Christi)
  // calculados via algoritmo Anonymous Gregorian Computus.
  // ============================================
  function getBrazilNow() {
    var now = new Date();
    var fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
      weekday: 'short', hour12: false
    });
    var parts = {};
    fmt.formatToParts(now).forEach(function (p) {
      if (p.type !== 'literal') parts[p.type] = p.value;
    });
    return {
      year: parseInt(parts.year, 10),
      month: parseInt(parts.month, 10),
      day: parseInt(parts.day, 10),
      hour: parseInt(parts.hour, 10),
      minute: parseInt(parts.minute, 10),
      weekday: parts.weekday
    };
  }

  function easterMonthDay(year) {
    var a = year % 19;
    var b = Math.floor(year / 100);
    var c = year % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day = ((h + l - 7 * m + 114) % 31) + 1;
    return { month: month, day: day };
  }

  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function key(month, day) { return pad2(month) + '-' + pad2(day); }

  function holidaysBR(year) {
    var easter = easterMonthDay(year);
    var easterDate = new Date(Date.UTC(year, easter.month - 1, easter.day));
    function offset(days) {
      var d = new Date(easterDate.getTime() + days * 86400000);
      return key(d.getUTCMonth() + 1, d.getUTCDate());
    }
    return {
      '01-01': true,            // Confraternização Universal
      [offset(-48)]: true,      // Carnaval segunda
      [offset(-47)]: true,      // Carnaval terça
      [offset(-2)]: true,       // Sexta-feira Santa
      '04-21': true,            // Tiradentes
      '05-01': true,            // Dia do Trabalho
      [offset(60)]: true,       // Corpus Christi
      '09-07': true,            // Independência
      '10-12': true,            // N. Sra. Aparecida
      '11-02': true,            // Finados
      '11-15': true,            // Proclamação da República
      '11-20': true,            // Consciência Negra (federal desde 2024)
      '12-25': true             // Natal
    };
  }

  // Janelas em minutos desde a meia-noite: manhã 7h30–12h, tarde 14h–18h.
  var MANHA_INICIO = 7 * 60 + 30;
  var MANHA_FIM = 12 * 60;
  var TARDE_INICIO = 14 * 60;
  var TARDE_FIM = 18 * 60;

  // 'aberto' | 'almoco' | 'fechado'
  function businessState(t) {
    if (t.weekday === 'Sat' || t.weekday === 'Sun') return 'fechado';
    var hols = holidaysBR(t.year);
    if (hols[key(t.month, t.day)]) return 'fechado';

    var min = t.hour * 60 + t.minute;
    if (min >= MANHA_INICIO && min < MANHA_FIM) return 'aberto';
    if (min >= TARDE_INICIO && min < TARDE_FIM) return 'aberto';
    if (min >= MANHA_FIM && min < TARDE_INICIO) return 'almoco';
    return 'fechado';
  }

  function updateStatus() {
    var el = document.getElementById('biz-status');
    if (!el) return;
    var estado = businessState(getBrazilNow());
    var aberto = estado === 'aberto';
    el.classList.toggle('status-open', aberto);
    el.classList.toggle('status-closed', !aberto);
    var txt = el.querySelector('.status-text');
    if (!txt) return;
    // No almoço o cliente precisa saber que voltamos hoje, não que fechou o dia.
    if (estado === 'aberto') txt.textContent = 'Aberto agora';
    else if (estado === 'almoco') txt.textContent = 'Volta às 14h';
    else txt.textContent = 'Fechado agora';
  }

  // ============================================
  // CTA DE WHATSAPP FORA DO HORÁRIO (rev-0.9.6)
  // A oficina não trabalha por agendamento: o WhatsApp só é
  // atendido durante o expediente. Fora dele os CTAs ficam
  // inativos e dizem quando a oficina volta a atender, em vez
  // de mandar o visitante para uma conversa sem resposta.
  // Marcados com [data-wa-cta]. Os links de referência (número
  // no rodapé e na Política de Privacidade) ficam sempre ativos:
  // são canal de contato e de exercício de direitos da LGPD.
  // ============================================
  var DIAS_CURTOS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  function isDiaUtil(weekdayNum, ano, mes, dia) {
    if (weekdayNum === 0 || weekdayNum === 6) return false;
    return !holidaysBR(ano)[key(mes, dia)];
  }

  // Quando a oficina volta a atender. { dia: 'hoje'|'amanhã'|'seg'..., hora }
  function nextOpening(t) {
    var base = new Date(Date.UTC(t.year, t.month - 1, t.day));
    var min = t.hour * 60 + t.minute;

    if (isDiaUtil(base.getUTCDay(), t.year, t.month, t.day)) {
      if (min < MANHA_INICIO) return { dia: 'hoje', hora: '7h30' };
      if (min >= MANHA_FIM && min < TARDE_INICIO) return { dia: 'hoje', hora: '14h' };
    }

    for (var i = 1; i <= 30; i++) {
      var n = new Date(base.getTime() + i * 86400000);
      var ano = n.getUTCFullYear();
      var mes = n.getUTCMonth() + 1;
      var dia = n.getUTCDate();
      if (!isDiaUtil(n.getUTCDay(), ano, mes, dia)) continue;
      return { dia: i === 1 ? 'amanhã' : DIAS_CURTOS[n.getUTCDay()], hora: '7h30' };
    }
    return null;
  }

  // curto = rótulo do botão do topo, que não pode quebrar linha no mobile.
  // O rótulo longo começa pelo estado ('Fechado', 'Almoço') porque um botão
  // apagado dizendo só 'Abre ter às 7h30' não diz ao visitante o que ele era.
  function closedLabel(t, curto) {
    var nx = nextOpening(t);
    if (!nx) return curto ? 'Fechado' : 'Fechado agora';
    if (curto) return nx.dia === 'hoje' ? ('Volta ' + nx.hora) : 'Fechado';
    if (nx.dia === 'hoje') {
      return nx.hora === '14h'
        ? 'Almoço · volta às 14h'
        : 'Fechado · abre às ' + nx.hora;
    }
    return 'Fechado · abre ' + nx.dia + ' às ' + nx.hora;
  }

  function updateWhatsappCtas() {
    var ctas = document.querySelectorAll('[data-wa-cta]');
    if (!ctas.length) return;
    var t = getBrazilNow();
    var aberto = businessState(t) === 'aberto';

    for (var i = 0; i < ctas.length; i++) {
      var el = ctas[i];

      // Primeira passada: guarda o estado original do link.
      if (el.getAttribute('data-wa-href') === null) {
        el.setAttribute('data-wa-href', el.getAttribute('href') || '');
        el.setAttribute('data-wa-text', (el.textContent || '').trim());
        el.setAttribute('data-wa-aria', el.getAttribute('aria-label') || '');
      }

      var soIcone = el.querySelector('svg') !== null;
      var ariaOriginal = el.getAttribute('data-wa-aria');

      if (aberto) {
        el.setAttribute('href', el.getAttribute('data-wa-href'));
        el.classList.remove('is-closed');
        el.removeAttribute('aria-disabled');
        el.removeAttribute('tabindex');
        el.removeAttribute('title');
        if (!soIcone) el.textContent = el.getAttribute('data-wa-text');
        if (ariaOriginal) el.setAttribute('aria-label', ariaOriginal);
        else el.removeAttribute('aria-label');
      } else {
        var completo = closedLabel(t, false);
        // O botão do topo e o flutuante têm pouco espaço.
        var curto = el.classList.contains('nav-cta');
        el.removeAttribute('href');
        el.classList.add('is-closed');
        el.setAttribute('aria-disabled', 'true');
        el.setAttribute('tabindex', '-1');
        el.setAttribute('title', completo);
        el.setAttribute('aria-label', 'WhatsApp fora do horário de atendimento. ' + completo + '.');
        if (!soIcone) el.textContent = closedLabel(t, curto);
      }
    }
  }

  function tick() {
    updateStatus();
    updateWhatsappCtas();
  }

  tick();
  // Re-checa a cada minuto pra refletir transições de horário sem reload
  setInterval(tick, 60000);
})();
