(function () {
  var cfg = window.SITE_CONFIG || {};

  function text(value) {
    return String(value == null ? "" : value).trim();
  }

  function innDigits(value) {
    var digits = text(value).replace(/\D/g, "");
    return /^\d{10,12}$/.test(digits) ? digits : "";
  }

  function isPhoneReady(value) {
    return text(value).length > 0;
  }

  function fillBind(el, value) {
    var next = text(value);
    if (el.tagName === "A" && el.hasAttribute("data-bind-mailto")) {
      el.setAttribute("href", "mailto:" + next);
      el.textContent = next;
      return;
    }
    el.textContent = next;
  }

  Object.keys(cfg).forEach(function (key) {
    var value = cfg[key];
    if (key === "sellerInn") {
      var digits = innDigits(value);
      if (digits) value = digits;
    }
    document.querySelectorAll('[data-bind="' + key + '"]').forEach(function (el) {
      fillBind(el, value);
    });
    document.querySelectorAll('[data-bind-mailto="' + key + '"]').forEach(function (el) {
      fillBind(el, value);
    });
  });

  document.querySelectorAll("[data-show=inn]").forEach(function (el) {
    el.hidden = !innDigits(cfg.sellerInn);
  });
  document.querySelectorAll("[data-show=phone]").forEach(function (el) {
    el.hidden = !isPhoneReady(cfg.contactPhone);
  });

  document.querySelectorAll("[data-purchase-button]").forEach(function (el) {
    el.textContent = text(cfg.purchaseButtonText) || "Покупка будет доступна в приложении";
    if (cfg.purchaseStatus !== "live") {
      el.classList.add("btn-disabled");
      el.setAttribute("aria-disabled", "true");
    }
  });
})();
