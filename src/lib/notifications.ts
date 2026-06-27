export async function notifyBusiness(payload: unknown) {
  const destinations = {
    email: Boolean(import.meta.env.ORDER_EMAIL),
    sms: Boolean(import.meta.env.ORDER_SMS_NUMBER),
    pos: Boolean(import.meta.env.POS_WEBHOOK_URL)
  };
  if (import.meta.env.POS_WEBHOOK_URL) {
    await fetch(import.meta.env.POS_WEBHOOK_URL, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload)
    }).catch(() => undefined);
  }
  return destinations;
}
