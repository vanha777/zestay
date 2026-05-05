'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API);

export async function sendApplicationNotification({
  applicantName,
  applicantEmail,
  applicantAddress,
  employerName,
  employerPhone,
  employerEmail,
  emergencyContactName,
  emergencyContactPhone,
  propertyName,
  roomName,
  applicationId,
  moveInDate,
  lengthOfStay,
  employmentStatus,
  occupation,
  financialChanges,
  financialChangesDetails,
  rentalReasonToLeave,
  rentalStayDuration,
  hasPets,
  isSmoker,
  incomeSource,
  visa,
  universityName,
  fieldOfStudy
}: {
  applicantName: string;
  applicantEmail: string;
  applicantAddress: string;
  employerName?: string;
  employerPhone?: string;
  employerEmail?: string;
  occupation?: string;
  financialChanges?: string;
  financialChangesDetails?: string;
  rentalReasonToLeave?: string;
  rentalStayDuration?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  propertyName: string;
  roomName: string;
  applicationId: string;
  moveInDate?: string;
  lengthOfStay?: string;
  employmentStatus?: string;
  hasPets?: string;
  isSmoker?: string;
  incomeSource?: string | string[];
  visa?: string;
  universityName?: string;
  fieldOfStudy?: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Zestay <notifications@bookdi.au>',
      to: 'zestayau@gmail.com',
      subject: `New Rental Application: ${applicantName} for ${roomName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px;">
          <h1 style="font-size: 24px; color: #1a1a1a; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Application Received</h1>
          
          <div style="padding: 20px 0;">
            <p><strong>Applicant:</strong> ${applicantName}</p>
            <p><strong>Email:</strong> ${applicantEmail}</p>
            <p><strong>Current Address:</strong> ${applicantAddress}</p>
            ${visa || universityName ? `
            <div style="margin: 10px 0; padding: 10px; background: #f0f7ff; border-radius: 8px; border-left: 4px solid #0070f3;">
              <p style="margin: 0; font-weight: bold; font-size: 12px; text-transform: uppercase; color: #0070f3;">International Details</p>
              ${visa ? `<p style="margin: 5px 0 0;"><strong>Visa:</strong> ${visa}</p>` : ''}
              ${universityName ? `<p style="margin: 5px 0 0;"><strong>Institution:</strong> ${universityName}</p>` : ''}
              ${fieldOfStudy ? `<p style="margin: 5px 0 0;"><strong>Course:</strong> ${fieldOfStudy}</p>` : ''}
            </div>
            ` : ''}
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            
            <p><strong>Move-in Date:</strong> ${moveInDate || 'Not specified'}</p>
            <p><strong>Stay Duration:</strong> ${lengthOfStay || 'Not specified'} months</p>
            <p><strong>Employment:</strong> ${employmentStatus || 'Not specified'}</p>
            <p><strong>Job Title:</strong> ${occupation || 'N/A'}</p>
            <p><strong>Income Source:</strong> ${Array.isArray(incomeSource) ? incomeSource.join(', ') : (incomeSource || 'Not specified')}</p>
            <p><strong>Financial Stability:</strong> ${financialChanges === 'yes' ? `YES - ${financialChangesDetails}` : 'No expected changes'}</p>
            <p><strong>Pets:</strong> ${hasPets || 'No'}</p>
            <p><strong>Smoker:</strong> ${isSmoker || 'No'}</p>
            ${rentalStayDuration ? `
            <div style="margin-top: 10px; padding: 10px; background: #f9f9f9; border-radius: 8px;">
              <p style="margin: 0; font-weight: bold; font-size: 12px; text-transform: uppercase; color: #666;">Rental History Reference</p>
              <p style="margin: 5px 0 0;"><strong>Stay Duration:</strong> ${rentalStayDuration}</p>
              <p style="margin: 5px 0 0;"><strong>Reason to leave:</strong> ${rentalReasonToLeave || 'Not specified'}</p>
            </div>
            ` : ''}
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            
            <p><strong>Employer:</strong> ${employerName || 'N/A'}</p>
            <p><strong>Employer Phone:</strong> ${employerPhone || 'N/A'}</p>
            <p><strong>Employer Email:</strong> ${employerEmail || 'N/A'}</p>
            <p><strong>Emergency Contact:</strong> ${emergencyContactName || 'N/A'}</p>
            <p><strong>Emergency Phone:</strong> ${emergencyContactPhone || 'N/A'}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            
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
