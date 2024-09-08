import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request) {

  
  try {
    const objFromFrontEnd = await request.json();

    const msg = {
      to: objFromFrontEnd.to,
      from: 'zainabflash1998@gmail.com', // تأكد من أن هذا البريد الإلكتروني معتمد
      subject: objFromFrontEnd.subject,
      text: objFromFrontEnd.text,
    };

    await sgMail.send(msg);
    return NextResponse.json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
  }
}
