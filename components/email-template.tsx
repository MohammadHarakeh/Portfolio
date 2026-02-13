import * as React from 'react'

interface EmailTemplateProps {
  name: string
  email: string
  projectType: string
  message: string
}

export function EmailTemplate({
  name,
  email,
  projectType,
  message,
}: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ color: '#10b981', borderBottom: '2px solid #10b981', paddingBottom: '10px' }}>
          New Contact Form Submission
        </h1>
        
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ color: '#1f2937', marginBottom: '20px' }}>Contact Information</h2>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#4b5563' }}>Name:</strong>
            <p style={{ margin: '5px 0', color: '#111827' }}>{name}</p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#4b5563' }}>Email:</strong>
            <p style={{ margin: '5px 0', color: '#111827' }}>
              <a href={`mailto:${email}`} style={{ color: '#10b981', textDecoration: 'none' }}>
                {email}
              </a>
            </p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#4b5563' }}>Project Type:</strong>
            <p style={{ margin: '5px 0', color: '#111827' }}>{projectType}</p>
          </div>
        </div>
        
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ color: '#1f2937', marginBottom: '15px' }}>Message</h2>
          <div style={{
            backgroundColor: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            borderLeft: '4px solid #10b981',
            whiteSpace: 'pre-wrap',
            color: '#111827'
          }}>
            {message}
          </div>
        </div>
        
        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb', fontSize: '12px', color: '#6b7280' }}>
          <p>This email was sent from your portfolio contact form.</p>
          <p>Reply directly to this email to respond to {name}.</p>
        </div>
      </div>
    </div>
  )
}
