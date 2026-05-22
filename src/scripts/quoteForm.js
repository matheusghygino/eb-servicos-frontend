const WEBHOOK_URL = 'https://SEU_WEBHOOK_N8N_AQUI';

const form = document.querySelector('[data-quote-form]');
const feedback = document.querySelector('[data-form-feedback]');
const submitButton = document.querySelector('[data-submit-button]');
const phoneInput = document.querySelector('[data-phone-input]');

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function showFeedback(message, type) {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.classList.remove('hidden', 'bg-red-50', 'text-red-700', 'bg-green-50', 'text-green-700', 'bg-blue-50', 'text-primary');

  if (type === 'success') feedback.classList.add('bg-green-50', 'text-green-700');
  if (type === 'error') feedback.classList.add('bg-red-50', 'text-red-700');
  if (type === 'loading') feedback.classList.add('bg-blue-50', 'text-primary');
}

phoneInput?.addEventListener('input', (event) => {
  event.currentTarget.value = formatPhone(event.currentTarget.value);
});

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    showFeedback('Preencha os campos obrigatórios para enviar sua solicitação.', 'error');
    return;
  }

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  payload.source = 'site-eb-servicos';
  payload.page = window.location.href;
  payload.submitted_at = new Date().toISOString();

  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';
  showFeedback('Enviando sua solicitação. Aguarde um instante.', 'loading');

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error('Webhook returned an error');

    form.reset();
    showFeedback('Solicitação enviada com sucesso. Em breve a EB Serviços entrará em contato.', 'success');
  } catch (error) {
    showFeedback('Não foi possível enviar agora. Tente novamente em alguns instantes ou confira o webhook configurado.', 'error');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Enviar solicitação';
  }
});
