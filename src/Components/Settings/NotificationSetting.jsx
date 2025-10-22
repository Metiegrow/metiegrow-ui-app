import React, { useState, useEffect } from 'react';
import { Switch, Card, Divider } from 'antd';

const NotificationSetting = () => {
  const URL = import.meta.env.VITE_API_BASE_URL_BACKEND;
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from db.json
    fetch(`${URL}/api/notificationSettings`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data && typeof data === 'object') {
          setSettings(data);
        } else {
          setError('Invalid data format received');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching notification settings:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleToggle = (settingId) => {
    setSettings((prev) => ({
      ...prev,
      [settingId]: {
        ...prev[settingId],
        enabled: !prev[settingId].enabled,
      },
    }));
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-transparent !border-none flex items-center justify-center'>
        <div className='text-white'>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-transparent !border-none flex items-center justify-center'>
        <div className='text-red-500'>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-transparent !border-none'>
      <Card className='shadow-lg rounded-lg bg-transparent !border-none'>
        <div className=''>
          {Object.values(settings).length > 0 ? (
            Object.values(settings).map((item) => (
              <div key={item.id} className='flex items-center justify-between mb-4'>
                <div className='flex items-start space-x-4'>
                  <div>
                    <h3 className='text-lg font-medium text-white'>{item.title}</h3>
                    <p className='text-sm text-gray-400'>{item.description}</p>
                  </div>
                </div>
                <Switch
                  checked={item.enabled}
                  onChange={() => handleToggle(item.id)}
                  className={`${item.enabled ? 'bg-green-500' : 'bg-gray-200'}`}
                />
              </div>
            ))
          ) : (
            <div className='text-center text-white'>No notification settings available</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NotificationSetting;
