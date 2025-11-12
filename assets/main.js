document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  const form = document.getElementById('contactForm'); const status = document.getElementById('formStatus'); if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        status.textContent = 'Thanks — we will contact you shortly.';
        form.reset();
        return;
      }
      throw new Error('Non-2xx');
    } catch (_) {
      const subject = encodeURIComponent('New JurisChain inquiry');
      const body = encodeURIComponent(`Name: ${data.name||''}
Email: ${data.email||''}
Company: ${data.company||''}
Message:
${data.message||''}`);
      window.location.href = `mailto:contact@cerebrasystem.co.uk?subject=${subject}&body=${body}`;
      status.textContent = 'Opening your email client…';
    }
  });
});