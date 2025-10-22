import React, { useState } from 'react';
import { Calendar, Edit3 } from 'lucide-react';
import TimePicker from './TimePicker';
import { useCreateMentorAppointment, useMentorAvailability } from '@/hooks/calendar';
import { BackButtonIcon } from '../Common/SVG/svg.function';
import { Button, Input } from 'antd';
import { useRouter } from '@tanstack/react-router';
import NoDataCalendarImage from '../../assets/NoDataCalendar.png';
import { getAuthData } from '../Auth/Auth.Function';
const AvailabilityScheduler = () => {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState('preferences'); // 'availability' or 'preferences'
  const [selectedDays, setSelectedDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState({});
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [currentEditingDay, setCurrentEditingDay] = useState('Monday');
  const [pickerFromTime, setPickerFromTime] = useState({ hours: 1, minutes: 30, period: 'PM' });
  const [pickerToTime, setPickerToTime] = useState({ hours: 12, minutes: 0, period: 'PM' });
  // Date range state
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [editingSlotIndex, setEditingSlotIndex] = useState(null);
  const [apiMessage, setApiMessage] = useState('');
  const [dateError, setDateError] = useState('');

  // Initialize mutation hook
  const { mutateAsync: createMentorAppointment, isPending: isCreating } =
    useCreateMentorAppointment();

  // Get current user ID from localStorage or context
  const userId = getAuthData()?.userId;

  // Fetch mentor availability
  const {
    data: availabilityData,
    isLoading: isLoadingAvailability,
    refetch: refetchAvailability,
  } = useMentorAvailability(userId, { enabled: !!userId });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleDay = (day) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        // Remove day and its time slots
        const newSelectedDays = prev.filter((d) => d !== day);
        setSelectedTimeSlots((prevSlots) => {
          const newSlots = { ...prevSlots };
          delete newSlots[day];
          return newSlots;
        });
        return newSelectedDays;
      } else {
        // Add day with default time slots
        setTimeSlots((prev) => ({
          ...prev,
          [day]: prev[day] || [
            '9:30-10:30',
            '10:30-11:30',
            '11:30-12:30',
            '12:30-1:30',
            '2:00-3:00',
            '3:00-4:00',
          ],
        }));
        setSelectedTimeSlots((prev) => ({
          ...prev,
          [day]: [],
        }));
        return [...prev, day];
      }
    });
  };

  const toggleTimeSlot = (day, slot) => {
    setSelectedTimeSlots((prev) => ({
      ...prev,
      [day]: prev[day]?.includes(slot)
        ? prev[day].filter((s) => s !== slot)
        : [...(prev[day] || []), slot],
    }));
  };

  const openTimeSelector = (day) => {
    setCurrentEditingDay(day);
    setShowTimeSelector(true);
  };

  const handleEditSlot = (day, slotIndex) => {
    setCurrentEditingDay(day);
    // Parse slot string to set pickerFromTime/pickerToTime
    const slot = selectedTimeSlots[day][slotIndex];
    const [from, to] = slot.split(' - ');
    const [fromTime, fromPeriod] = from.trim().split(' ');
    const [toTime, toPeriod] = to.trim().split(' ');
    const [fromHours, fromMinutes] = fromTime.split(':').map(Number);
    const [toHours, toMinutes] = toTime.split(':').map(Number);
    setPickerFromTime({ hours: fromHours, minutes: fromMinutes, period: fromPeriod });
    setPickerToTime({ hours: toHours, minutes: toMinutes, period: toPeriod });
    setShowTimeSelector(true);
    setEditingSlotIndex(slotIndex);
  };

  const handleDeleteSlot = (slotId) => {
    // TODO: Call API to delete slot
    console.log('Delete slot:', slotId);
    // After successful deletion, refetch availability
    refetchAvailability();
  };

  const handleTimePickerConfirm = () => {
    const slot = `${pickerFromTime.hours}:${pickerFromTime.minutes.toString().padStart(2, '0')} ${pickerFromTime.period} - ${pickerToTime.hours}:${pickerToTime.minutes.toString().padStart(2, '0')} ${pickerToTime.period}`;
    setTimeSlots((prev) => ({
      ...prev,
      [currentEditingDay]:
        editingSlotIndex !== null
          ? prev[currentEditingDay].map((s, idx) => (idx === editingSlotIndex ? slot : s))
          : [...(prev[currentEditingDay] || []), slot],
    }));
    setSelectedTimeSlots((prev) => ({
      ...prev,
      [currentEditingDay]:
        editingSlotIndex !== null
          ? prev[currentEditingDay].map((s, idx) => (idx === editingSlotIndex ? slot : s))
          : [...(prev[currentEditingDay] || []), slot],
    }));
    setShowTimeSelector(false);
    setEditingSlotIndex(null);
  };

  // Generate weekDays array (0=Sunday ... 6=Saturday) => API expects 1=Mon etc per sample
  const weekDayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  // Build API payload from UI state
  const buildSlotPayload = () => {
    const to24h = (t) => {
      const trimmed = t.trim();
      const parts = trimmed.split(' ');

      // Handle format without AM/PM (e.g., "9:30", "1:30")
      if (parts.length === 1) {
        const [h, m] = parts[0].split(':').map(Number);
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      }

      // Handle format with AM/PM (e.g., "1:30 PM")
      const [time, period] = parts;
      if (!time) return '00:00';
      let [h, m] = time.split(':').map(Number);
      if (period?.toUpperCase() === 'PM' && h !== 12) h += 12;
      if (period?.toUpperCase() === 'AM' && h === 12) h = 0;
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    // Build schedules array - one entry per selected time slot
    const schedules = [];

    selectedDays.forEach((day) => {
      const daySlots = selectedTimeSlots[day] || [];

      daySlots.forEach((slot) => {
        if (!slot || typeof slot !== 'string') return;

        // Handle both formats: "9:30-10:30" and "1:30 PM - 12:00 PM"
        let from, to;
        if (slot.includes(' - ')) {
          [from, to] = slot.split(' - ');
        } else if (slot.includes('-')) {
          [from, to] = slot.split('-');
        } else {
          return;
        }

        if (!from || !to) return;

        const startTime = to24h(from);
        const endTime = to24h(to);

        schedules.push({
          dayOfWeek: weekDayMap[day],
          startTime,
          endTime,
        });
      });
    });

    return {
      startDate: dateRange.start,
      endDate: dateRange.end,
      schedules,
      slotDurationMinutes: 60,
    };
  };

  const validateDateRange = () => {
    if (!dateRange.start || !dateRange.end) {
      setDateError('Please select both start and end dates');
      return false;
    }
    if (new Date(dateRange.start) > new Date(dateRange.end)) {
      setDateError('End date must be after start date');
      return false;
    }
    setDateError('');
    return true;
  };

  const handleCreateMentorSlots = async () => {
    if (!validateDateRange()) {
      return;
    }
    setApiMessage('');
    try {
      const payload = buildSlotPayload();
      const result = await createMentorAppointment(payload);
      const msg = result?.statuses?.[0]?.message || 'Slots created successfully';
      setApiMessage(msg);

      // Clear states and switch to preferences screen
      setTimeout(() => {
        clearStates();
        refetchAvailability();
        setCurrentScreen('preferences');
        setApiMessage('');
      }, 1500);
    } catch (e) {
      setApiMessage(e.message || 'Failed to create slots');
    }
  };

  const clearStates = () => {
    setSelectedDays([]);
    setTimeSlots({});
    setSelectedTimeSlots({});
    setDateRange({ start: '', end: '' });
    setDateError('');
  };

  // --- UI RENDERING ---
  const renderAvailabilityScreen = () => (
    <div className='min-h-screen bg-black text-white p-4 md:p-6 lg:p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex-1'>
            <button
              className='w-12 h-12 bg-gradient-to-br from-purple-800 via-purple-700 to-purple-900 rounded-full flex items-center justify-center shadow-lg'
              onClick={() => router.history.back()}
            >
              <BackButtonIcon className='w-6 h-6' />
            </button>
          </div>
          <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold flex-1 text-center'>
            Availability
          </h1>
          <div className='flex-1 flex justify-end'>
            {dateRange.start && dateRange.end && (
              <div className='flex items-center gap-2 bg-purple-600 px-3 py-1 rounded-lg'>
                <Calendar className='w-4 h-4' />
                <span className='text-sm'>
                  {dateRange.start} - {dateRange.end}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* Editable Date Range */}
        <div className='mb-6'>
          <div className='flex gap-2'>
            <Input
              type='date'
              value={dateRange.start}
              min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
              onChange={(e) => {
                setDateRange((prev) => ({ ...prev, start: e.target.value }));
                setDateError('');
              }}
              placeholder='Start Date'
              className='bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white'
            />
            <Input
              type='date'
              value={dateRange.end}
              min={dateRange.start || new Date(Date.now() + 86400000).toISOString().split('T')[0]}
              onChange={(e) => {
                setDateRange((prev) => ({ ...prev, end: e.target.value }));
                setDateError('');
              }}
              placeholder='End Date'
              className='bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white'
            />
          </div>
          {dateError && <div className='mt-2 text-red-400 text-sm'>{dateError}</div>}
        </div>
        <p className='text-gray-300 mb-8 leading-relaxed'>
          Set your working hours preferences of your mentoring
        </p>
        {days.map((day) => {
          const isSelected = selectedDays.includes(day);
          return (
            <div key={day} className='mb-6'>
              <div className='flex items-center gap-4 mb-4'>
                <Button
                  onClick={() => toggleDay(day)}
                  className={`w-6 h-6 border-2 rounded flex items-center justify-center ${
                    isSelected ? 'border-green-400 bg-green-400' : 'border-gray-500 bg-transparent'
                  }`}
                >
                  {isSelected && <span className='text-black text-sm'>✓</span>}
                </Button>
                <span className={`text-lg ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                  {day}
                </span>
              </div>
              {isSelected && (
                <>
                  <div className='grid grid-cols-3 gap-2 mb-4'>
                    {timeSlots[day]?.map((slot, index) => (
                      <Button
                        key={index}
                        onClick={() => toggleTimeSlot(day, slot)}
                        className={`py-2 px-3 rounded-full text-sm border transition-colors ${
                          selectedTimeSlots[day]?.includes(slot)
                            ? 'bg-purple-600 border-purple-600 text-white'
                            : 'border-gray-600 bg-transparent text-gray-300 hover:border-purple-400'
                        }`}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={() => openTimeSelector(day)}
                    className='mt-2 mb-2 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-semibold shadow-md transition-colors'
                  >
                    Customize
                  </Button>
                </>
              )}
            </div>
          );
        })}
        {/* <Button
          onClick={handleConfirm}
          className='w-full bg-gradient-to-r from-purple-500 to-purple-600 py-4 rounded-2xl text-white text-lg md:text-xl font-semibold mt-8'
        >
          Confirm (Local Mock)
        </Button> */}
        <Button
          onClick={handleCreateMentorSlots}
          disabled={isCreating}
          className='w-full bg-purple-700 hover:bg-purple-800 py-4 rounded-2xl text-white text-lg md:text-xl font-semibold mt-3 disabled:opacity-60'
        >
          {isCreating ? 'Creating Slots...' : 'Create Mentor Slots'}
        </Button>
        {apiMessage && <div className='mt-4 text-center text-green-400'>{apiMessage}</div>}
      </div>
      {showTimeSelector && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center'>
          <TimePicker
            fromTime={pickerFromTime}
            toTime={pickerToTime}
            setFromTime={setPickerFromTime}
            setToTime={setPickerToTime}
            onConfirm={handleTimePickerConfirm}
            onClose={() => setShowTimeSelector(false)}
          />
        </div>
      )}
    </div>
  );

  // Format time to HH:MM format from timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';

    // If it's a timestamp (number), convert to HH:MM
    if (typeof timestamp === 'number') {
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    // If it's already a string in HH:MM format
    if (typeof timestamp === 'string' && timestamp.includes(':')) {
      const [hours, minutes] = timestamp.split(':');
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }

    return timestamp;
  };

  const renderPreferencesScreen = () => {
    const hasAvailability = availabilityData && availabilityData.length > 0;

    return (
      <div className='min-h-screen bg-black text-white p-6'>
        <div className='max-w-md mx-auto'>
          <div className='flex items-center justify-between mb-8'>
            <button
              onClick={() => router.history.back()}
              className='w-12 h-12 bg-gradient-to-br from-purple-800 via-purple-700 to-purple-900 rounded-full flex items-center justify-center shadow-lg'
            >
              <BackButtonIcon className='w-6 h-6' />
            </button>
            <h1 className='text-xl font-semibold'>Availability Preference</h1>
            <div className='w-10 h-10' />
          </div>

          {isLoadingAvailability ? (
            <div className='flex justify-center items-center mt-20'>
              <div className='text-gray-400'>Loading availability...</div>
            </div>
          ) : hasAvailability ? (
            <div>
              {availabilityData.map((availableData, index) => {
                const dayName = availableData.day || 'Unknown';
                return (
                  <div key={index} className='bg-gray-800 rounded-2xl p-6 mb-4'>
                    <div className='flex items-center justify-between mb-4'>
                      <div>
                        <h2 className='text-xl font-semibold'>{dayName}</h2>
                        <p className='text-gray-400 text-sm'>your working hours preferences</p>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentEditingDay(dayName);
                          setCurrentScreen('availability');
                        }}
                        className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center'
                      >
                        <Edit3 className='w-5 h-5' />
                      </button>
                    </div>
                    <div className='flex items-center gap-2 mb-4'>
                      <Calendar className='w-4 h-4 text-purple-400' />
                      <span className='text-purple-400 text-sm'>
                        {availableData.startDate || ''} - {availableData.endDate || ''}
                      </span>
                    </div>
                    {availableData.slots?.map((slot, index) => {
                      return (
                        <div
                          key={index}
                          className='py-2 px-3 bg-gray-700 rounded-full text-center text-sm flex items-center gap-2 w-fit'
                        >
                          <span>
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </span>
                          {/* <button
                            className='ml-2 text-yellow-400 hover:text-yellow-600'
                            onClick={() => handleEditSlot(dayName, index)}
                            title='Edit'
                          >
                            ✏️
                          </button>
                          <button
                            className='ml-1 text-red-400 hover:text-red-600'
                            onClick={() => handleDeleteSlot(slot)}
                            title='Delete'
                          >
                            🗑️
                          </button> */}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <button
                onClick={() => setCurrentScreen('availability')}
                className='w-full mt-6 px-10 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full text-lg font-semibold shadow-lg'
              >
                Add More Slots
              </button>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center mt-20'>
              <img
                src={NoDataCalendarImage}
                alt='No Preferences'
                className='w-40 h-40 mb-6'
                style={{ objectFit: 'contain' }}
              />
              <p className='text-white text-base mb-2'>Still you&apos;re not add any preferences</p>
              <button
                onClick={() => setCurrentScreen('availability')}
                className='mt-4 px-10 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full text-lg font-semibold shadow-lg'
              >
                Add Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='relative'>
      <div className='fixed top-4 right-4 z-40 flex gap-2'>
        <button
          onClick={() => setCurrentScreen('availability')}
          className={`px-4 py-2 rounded text-sm ${currentScreen === 'availability' ? 'bg-purple-600 text-white' : 'bg-gray-300 text-black'}`}
        >
          Availability
        </button>
        <button
          onClick={() => setCurrentScreen('preferences')}
          className={`px-4 py-2 rounded text-sm ${currentScreen === 'preferences' ? 'bg-purple-600 text-white' : 'bg-gray-300 text-black'}`}
        >
          Preferences
        </button>
      </div>
      {currentScreen === 'availability' && renderAvailabilityScreen()}
      {currentScreen === 'preferences' && renderPreferencesScreen()}
    </div>
  );
};

export default AvailabilityScheduler;
