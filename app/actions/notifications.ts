'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API);

export async function sendApplicationNotification({
  applicantName,
  applicantEmail,
  applicantAddress,
  employerName,
  employerPhone,
  emergencyContactName,
  emergencyContactPhone,
  propertyName,
  roomName,
  applicationId
}: {
  applicantName: string;
  applicantEmail: string;
  applicantAddress: string;
  employerName?: string;
  employerPhone?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  propertyName: string;
  roomName: string;
  applicationId: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Zestay <notifications@bookdi.au>',
      to: 'zestayau@gmail.com',
      subject: `New Rental Application: ${applicantName} for ${roomName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h1 style="font-size: 24px; color: #1a1a1a;">New Application Received</h1>
          <p>A new rental application has been submitted for Zestay.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p><strong>Applicant:</strong> ${applicantName}</p>
            <p><strong>Email:</strong> ${applicantEmail}</p>
            <p><strong>Current Address:</strong> ${applicantAddress}</p>
            <p><strong>Employer:</strong> ${employerName || 'N/A'}</p>
            <p><strong>Employer Phone:</strong> ${employerPhone || 'N/A'}</p>
            <p><strong>Emergency Contact:</strong> ${emergencyContactName || 'N/A'}</p>
            <p><strong>Emergency Phone:</strong> ${emergencyContactPhone || 'N/A'}</p>
            <p><strong>Property:</strong> ${propertyName}</p>
            <p><strong>Room:</strong> ${roomName}</p>
          </div>
          
          <a href="https://www.zestay.au/admin/applicants/${applicationId}" 
             style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Review Application
          </a>
          
          <p style="font-size: 12px; color: #999; margin-top: 40px;">
            This is an automated notification from the Zestay Admin Portal.
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Notification Error:', error);
    return { success: false, error };
  }
}
