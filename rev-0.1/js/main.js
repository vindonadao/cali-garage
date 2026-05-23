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
  // Aberto seg–sex 08h–18h, horário America/Sao_Paulo.
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

  function isOpen(t) {
    if (t.weekday === 'Sat' || t.weekday === 'Sun') return false;
    var hols = holidaysBR(t.year);
    if (hols[key(t.month, t.day)]) return false;
    if (t.hour < 8 || t.hour >= 18) return false;
    return true;
  }

  function updateStatus() {
    var el = document.getElementById('biz-status');
    if (!el) return;
    var t = getBrazilNow();
    var open = isOpen(t);
    el.classList.toggle('status-open', open);
    el.classList.toggle('status-closed', !open);
    var txt = el.querySelector('.status-text');
    if (txt) txt.textContent = open ? 'Aberto agora' : 'Fechado agora';
  }

  updateStatus();
  // Re-checa a cada minuto pra refletir transições de horário sem reload
  setInterval(updateStatus, 60000);
})();
