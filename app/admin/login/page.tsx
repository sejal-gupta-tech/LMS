'use client';

import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <LoginForm redirectPath="/admin/dashboard" />
    </div>
  );
}
