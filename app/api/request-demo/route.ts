import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, datetime, message, source } = body;

    if (!firstName || !lastName || (!email && !phone)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const formattedDateTime = datetime
      ? new Date(datetime).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        })
      : 'Not specified';

    const emailContent = `
New Demo Request — EarlyLight (${source || 'Marketing Site'})

Contact:
  Name:  ${firstName} ${lastName}
  Email: ${email || 'Not provided'}
  Phone: ${phone || 'Not provided'}
  Preferred time: ${formattedDateTime}

Message:
${message || 'None'}

Submitted: ${new Date().toLocaleString('en-US')}
    `.trim();

    if (resend) {
      try {
        await resend.emails.send({
          from: 'EarlyLight Demo Requests <onboarding@resend.dev>',
          to: 'info@earlylight.health',
          subject: `Demo request from ${firstName} ${lastName}`,
          text: emailContent,
        });
      } catch (emailError) {
        console.error('Email send failed (non-critical):', emailError);
      }
    } else {
      console.log('Resend not configured. Demo request:', emailContent);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing demo request:', error);
    return NextResponse.json({ error: 'Failed to send demo request' }, { status: 500 });
  }
}
