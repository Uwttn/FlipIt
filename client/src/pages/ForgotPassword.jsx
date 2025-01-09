import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('');

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Unable to send reset link. Check the email and try again.');
      }

      // Successfully sent email
      setStatus('A password reset link has been sent to your email.');
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Forgot Password</h1>
      <div style={{textAlign:'center'}}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email:</label>
        <br />
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{border: 'solid'}}
        />
        <br />
        <button type="submit">Send Reset Link</button>
      </form>

      {status && <p>{status}</p>}
    </div>
    </div>
  );
}

export default ForgotPassword;
