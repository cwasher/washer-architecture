interface Env {
  SENDGRID_API_KEY: string;
  CONTACT_TO_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
  SITE_NAME?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const headers = {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json',
  };

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid request.' }), {
      status: 400,
      headers,
    });
  }

  const honeypot = data.get('website');
  if (honeypot && String(honeypot).trim() !== '') {
    return new Response(null, { status: 204, headers });
  }

  const name = String(data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();
  const phone = String(data.get('phone') ?? '').trim();
  const location = String(data.get('location') ?? '').trim();
  const projectType = String(data.get('projectType') ?? '').trim();
  const budget = String(data.get('budget') ?? '').trim();
  const timeline = String(data.get('timeline') ?? '').trim();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ ok: false, error: 'Name, email, and message are required.' }), {
      status: 422,
      headers,
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'Please enter a valid email address.' }), {
      status: 422,
      headers,
    });
  }

  const truncatedMessage = message.slice(0, 5000);

  const siteName = env.SITE_NAME || 'Washer Architecture';

  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    location ? `Project Location: ${location}` : null,
    projectType ? `Project Type: ${projectType}` : null,
    budget ? `Budget Range: ${budget}` : null,
    timeline ? `Timeline: ${timeline}` : null,
    ``,
    `Message:`,
    truncatedMessage,
  ]
    .filter((line) => line !== null)
    .join('\n');

  const payload = {
    personalizations: [
      {
        to: [{ email: env.CONTACT_TO_EMAIL }],
        subject: `New website inquiry: ${name}`,
      },
    ],
    from: {
      email: env.CONTACT_FROM_EMAIL,
      name: siteName,
    },
    reply_to: {
      email: email,
      name: name,
    },
    content: [
      {
        type: 'text/plain',
        value: emailBody,
      },
      {
        type: 'text/html',
        value: `
          <table style="font-family:sans-serif;font-size:14px;color:#333;max-width:600px;width:100%">
            <tr><td style="padding:24px 0 8px">
              <h2 style="margin:0;font-size:20px;color:#344950">New website inquiry from ${name}</h2>
            </td></tr>
            <tr><td style="padding:0 0 24px;border-bottom:1px solid #e5e7eb">
              ${[
                ['Name', name],
                ['Email', `<a href="mailto:${email}" style="color:#476066">${email}</a>`],
                phone ? ['Phone', phone] : null,
                location ? ['Project Location', location] : null,
                projectType ? ['Project Type', projectType] : null,
                budget ? ['Budget Range', budget] : null,
                timeline ? ['Timeline', timeline] : null,
              ]
                .filter(Boolean)
                .map(
                  ([label, value]) =>
                    `<p style="margin:6px 0"><strong>${label}:</strong> ${value}</p>`
                )
                .join('')}
            </td></tr>
            <tr><td style="padding:24px 0 0">
              <strong>Message:</strong>
              <p style="margin:8px 0 0;white-space:pre-wrap;color:#444">${truncatedMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </td></tr>
          </table>`,
      },
    ],
  };

  try {
    const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!sgResponse.ok) {
      const errText = await sgResponse.text();
      console.error('SendGrid error:', sgResponse.status, errText);
      return new Response(JSON.stringify({ ok: false, error: 'Failed to send message. Please try again.' }), {
        status: 502,
        headers,
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err) {
    console.error('SendGrid fetch error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'An unexpected error occurred. Please try again.' }), {
      status: 500,
      headers,
    });
  }
};
