// Contact form handling with EmailJS (static) and local JSON log fallback
// Configure your EmailJS IDs in the HTML or via data-* attributes on the form element
(function initContact() {
  function $(sel, ctx){ return (ctx||document).querySelector(sel); }
  function createLogEntry(payload){
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'hire_request_'+ Date.now() +'.json';
    a.click();
    setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
  }

  function init() {
    var form = document.forms['contact-form'] || $('form[name="contact-form"]');
    if (!form) return;

    var status = $('#msg') || document.createElement('span');
    status.id = 'msg';
    if (!status.parentNode) form.parentNode && form.parentNode.appendChild(status);

    form.addEventListener('submit', function(e){
      // Support inline action if present (Apps Script) but prefer JS
      e.preventDefault();

      var name = form.querySelector('[name="NAME"]').value.trim();
      var email = form.querySelector('[name="E-MAIL"]').value.trim();
      var phone = (form.querySelector('[name="PHONE_NO"]').value || '').trim();
      var message = form.querySelector('[name="Message"]').value.trim();
      var honeypot = form.querySelector('[name="_hp"]').value || '';

      if (honeypot) return; // simple spam block
      if (!name || !email || !message) {
        status.textContent = 'Please fill in name, email, and message.';
        status.style.color = '#c0392b';
        return;
      }

      var payload = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        userAgent: navigator.userAgent,
        ts: new Date().toISOString()
      };

      // EmailJS integration if configured via data attributes
      var service = form.getAttribute('data-emailjs-service');
      var template = form.getAttribute('data-emailjs-template');
      var publicKey = form.getAttribute('data-emailjs-user');

      status.textContent = 'Sending...';
      status.style.color = '#555';

      function done(ok){
        if (ok) {
          status.textContent = 'Message sent successfully!';
          status.style.color = '#27ae60';
          try { form.reset(); } catch (_) {}
        } else {
          status.textContent = 'Sent locally. Please attach the downloaded JSON to an email.';
          status.style.color = '#e67e22';
        }
      }

      if (window.emailjs && service && template && publicKey) {
        try {
          emailjs.init(publicKey);
          emailjs.send(service, template, payload)
            .then(function(){ done(true); })
            .catch(function(){ createLogEntry(payload); done(false); });
        } catch (err) {
          createLogEntry(payload); done(false);
        }
      } else {
        // Fallback: offer a downloadable JSON log
        createLogEntry(payload);
        done(false);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();


