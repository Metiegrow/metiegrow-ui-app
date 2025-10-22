import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

function Settings() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: '/app/settings/account' });
  }, [navigate]);

  return null;
}

export default Settings;
