import React, { useState, useRef, useEffect } from 'react';

const TimePicker = ({ fromTime, toTime, setFromTime, setToTime, onConfirm, onClose }) => {
  const [activeField, setActiveField] = useState('from');
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState('hours'); // 'hours' or 'minutes'
  const [showPresets, setShowPresets] = useState(false);
  const [minuteIncrement, setMinuteIncrement] = useState(5); // 1, 5, 15, 30 minute increments

  const clockRef = useRef(null);
  const centerX = 150;
  const centerY = 150;
  const radius = 120;

  const formatTime = (time) => {
    const hours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours;
    const minutes = time.minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getAngleFromTime = (hours, minutes, isHour = true) => {
    if (isHour) {
      const hour12 = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      return hour12 * 30 - 90; // 30 degrees per hour, -90 to start from top
    } else {
      return minutes * 6 - 90; // 6 degrees per minute, -90 to start from top
    }
  };

  const getTimeFromAngle = (angle, isHour = true) => {
    const normalizedAngle = (angle + 90 + 360) % 360;
    if (isHour) {
      const hour = Math.round(normalizedAngle / 30);
      return hour === 0 ? 12 : hour;
    } else {
      const rawMinutes = Math.round(normalizedAngle / 6) % 60;
      // Snap to increment
      return (Math.round(rawMinutes / minuteIncrement) * minuteIncrement) % 60;
    }
  };

  const getCoordinatesFromAngle = (angle, r = radius) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: centerX + r * Math.cos(radian),
      y: centerY + r * Math.sin(radian),
    };
  };

  const getAngleFromCoordinates = (x, y) => {
    const dx = x - centerX;
    const dy = y - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const handleMouseDown = (e, type) => {
    setIsDragging(true);
    setDragType(type);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !clockRef.current) return;

    const rect = clockRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const angle = getAngleFromCoordinates(x, y);

    const currentTime = activeField === 'from' ? fromTime : toTime;
    const setTime = activeField === 'from' ? setFromTime : setToTime;

    if (dragType === 'hours') {
      const newHours = getTimeFromAngle(angle, true);
      setTime({ ...currentTime, hours: newHours });
    } else {
      const newMinutes = getTimeFromAngle(angle, false);
      setTime({ ...currentTime, minutes: newMinutes });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType('hours');
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragType, activeField, fromTime, toTime]);

  const currentTime = activeField === 'from' ? fromTime : toTime;
  const hourAngle = getAngleFromTime(currentTime.hours, 0, true);
  const minuteAngle = getAngleFromTime(0, currentTime.minutes, false);

  const hourHand = getCoordinatesFromAngle(hourAngle, 80);
  const minuteHand = getCoordinatesFromAngle(minuteAngle, 100);

  const togglePeriod = (field) => {
    if (field === 'from') {
      setFromTime({ ...fromTime, period: fromTime.period === 'AM' ? 'PM' : 'AM' });
    } else {
      setToTime({ ...toTime, period: toTime.period === 'AM' ? 'PM' : 'AM' });
    }
  };

  const adjustTime = (field, type, direction) => {
    const currentTime = field === 'from' ? fromTime : toTime;
    const setTime = field === 'from' ? setFromTime : setToTime;

    if (type === 'hours') {
      let newHours = direction === 'up' ? currentTime.hours + 1 : currentTime.hours - 1;
      if (newHours > 12) newHours = 1;
      if (newHours < 1) newHours = 12;
      setTime({ ...currentTime, hours: newHours });
    } else {
      let newMinutes =
        direction === 'up'
          ? currentTime.minutes + minuteIncrement
          : currentTime.minutes - minuteIncrement;
      if (newMinutes >= 60) newMinutes = 0;
      if (newMinutes < 0) newMinutes = 60 - minuteIncrement;
      setTime({ ...currentTime, minutes: newMinutes });
    }
  };

  const presetTimes = [
    { label: '30 min', duration: 30 },
    { label: '1 hour', duration: 60 },
    { label: '2 hours', duration: 120 },
    { label: '4 hours', duration: 240 },
    { label: '8 hours', duration: 480 },
  ];

  const applyPreset = (durationMinutes) => {
    const fromTotalMinutes =
      fromTime.hours * 60 +
      fromTime.minutes +
      (fromTime.period === 'PM' && fromTime.hours !== 12 ? 12 * 60 : 0) +
      (fromTime.period === 'AM' && fromTime.hours === 12 ? -12 * 60 : 0);
    const toTotalMinutes = fromTotalMinutes + durationMinutes;

    const toHours24 = Math.floor(toTotalMinutes / 60) % 24;
    const toMinutes = toTotalMinutes % 60;

    const toHours12 = toHours24 === 0 ? 12 : toHours24 > 12 ? toHours24 - 12 : toHours24;
    const toPeriod = toHours24 >= 12 ? 'PM' : 'AM';

    setToTime({ hours: toHours12, minutes: toMinutes, period: toPeriod });
    setShowPresets(false);
  };

  const getDuration = () => {
    const fromTotalMinutes =
      fromTime.hours * 60 +
      fromTime.minutes +
      (fromTime.period === 'PM' && fromTime.hours !== 12 ? 12 * 60 : 0) +
      (fromTime.period === 'AM' && fromTime.hours === 12 ? -12 * 60 : 0);

    let toTotalMinutes =
      toTime.hours * 60 +
      toTime.minutes +
      (toTime.period === 'PM' && toTime.hours !== 12 ? 12 * 60 : 0) +
      (toTime.period === 'AM' && toTime.hours === 12 ? -12 * 60 : 0);

    if (toTotalMinutes <= fromTotalMinutes) {
      toTotalMinutes += 24 * 60; // Next day
    }

    const duration = toTotalMinutes - fromTotalMinutes;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center'>
      <div className='bg-black rounded-2xl shadow-2xl p-6 w-full max-w-md flex flex-col items-center'>
        {/* Header Controls */}
        <div className='mb-8 flex flex-wrap items-center gap-4 w-full justify-center'>
          {/* Minute Increment Selector */}
          <div className='flex items-center gap-2'>
            <span className='text-gray-400 text-sm'>Increment:</span>
            <select
              value={minuteIncrement}
              onChange={(e) => setMinuteIncrement(Number(e.target.value))}
              className='bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm'
            >
              <option value={1}>1 min</option>
              <option value={5}>5 min</option>
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
            </select>
          </div>

          {/* Preset Durations */}
          <div className='relative'>
            <button
              onClick={() => setShowPresets(!showPresets)}
              className='bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1 rounded transition-colors'
            >
              Quick Durations
            </button>
            {showPresets && (
              <div className='absolute top-full mt-2 bg-gray-800 border border-gray-600 rounded shadow-lg z-10'>
                {presetTimes.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset.duration)}
                    className='block w-full text-left px-3 py-2 text-white hover:bg-gray-700 text-sm'
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Duration Display */}
          <div className='bg-gray-800 px-3 py-1 rounded'>
            <span className='text-gray-400 text-sm'>Duration: </span>
            <span className='text-cyan-400 text-sm font-medium'>{getDuration()}</span>
          </div>
        </div>
        {/* Circular Clock */}
        <div className='relative mb-12 flex flex-col items-center justify-center'>
          <svg
            ref={clockRef}
            width='300'
            height='300'
            className='cursor-pointer select-none'
            style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))' }}
          >
            {/* Outer ring */}
            <circle
              cx={centerX}
              cy={centerY}
              r={135}
              fill='none'
              stroke='#1f1f1f'
              strokeWidth='30'
            />
            {/* Purple ring */}
            <circle
              cx={centerX}
              cy={centerY}
              r={120}
              fill='none'
              stroke='#a855f7'
              strokeWidth='4'
            />
            {/* Clock face */}
            <circle cx={centerX} cy={centerY} r={116} fill='#000000' />
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => {
              const angle = i * 30 - 90;
              const outer = getCoordinatesFromAngle(angle, 110);
              const inner = getCoordinatesFromAngle(angle, 95);
              return (
                <line
                  key={i}
                  x1={outer.x}
                  y1={outer.y}
                  x2={inner.x}
                  y2={inner.y}
                  stroke='#333'
                  strokeWidth='2'
                />
              );
            })}
            {/* Minute markers */}
            {[...Array(60)].map((_, i) => {
              if (i % 5 !== 0) {
                const angle = i * 6 - 90;
                const outer = getCoordinatesFromAngle(angle, 110);
                const inner = getCoordinatesFromAngle(angle, 105);
                return (
                  <line
                    key={i}
                    x1={outer.x}
                    y1={outer.y}
                    x2={inner.x}
                    y2={inner.y}
                    stroke='#222'
                    strokeWidth='1'
                  />
                );
              }
              return null;
            })}
            {/* Hour hand */}
            <line
              x1={centerX}
              y1={centerY}
              x2={hourHand.x}
              y2={hourHand.y}
              stroke='#00bfff'
              strokeWidth='6'
              strokeLinecap='round'
              onMouseDown={(e) => handleMouseDown(e, 'hours')}
              className='cursor-grab active:cursor-grabbing'
            />
            {/* Minute hand */}
            <line
              x1={centerX}
              y1={centerY}
              x2={minuteHand.x}
              y2={minuteHand.y}
              stroke='#00bfff'
              strokeWidth='4'
              strokeLinecap='round'
              onMouseDown={(e) => handleMouseDown(e, 'minutes')}
              className='cursor-grab active:cursor-grabbing'
            />
            {/* Center dot */}
            <circle
              cx={centerX}
              cy={centerY}
              r='8'
              fill='#00bfff'
              stroke='#ffffff'
              strokeWidth='2'
            />
          </svg>
        </div>
        {/* Time Selection */}
        <div className='flex gap-8 mb-8 w-full justify-center'>
          {/* From Time */}
          <div className='text-center'>
            <div className='text-gray-400 text-lg mb-4'>From</div>
            <div
              className={`flex items-center gap-2 px-6 py-4 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                activeField === 'from'
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onClick={() => setActiveField('from')}
            >
              <span className='text-white text-2xl font-light min-w-[80px]'>
                {formatTime(fromTime)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePeriod('from');
                }}
                className='text-gray-400 hover:text-white text-xl ml-2 transition-colors'
              >
                {fromTime.period}
              </button>
            </div>
            {/* Fine Controls for From Time */}
            <div className='flex gap-2 mt-3 justify-center'>
              <div className='flex flex-col items-center'>
                <button
                  onClick={() => adjustTime('from', 'hours', 'up')}
                  className='text-gray-500 hover:text-white text-xs p-1'
                >
                  ▲
                </button>
                <span className='text-xs text-gray-500'>H</span>
                <button
                  onClick={() => adjustTime('from', 'hours', 'down')}
                  className='text-gray-500 hover:text-white text-xs p-1'
                >
                  ▼
                </button>
              </div>
              <div className='flex flex-col items-center'>
                <button
                  onClick={() => adjustTime('from', 'minutes', 'up')}
                  className='text-gray-500 hover:text-white text-xs p-1'
                >
                  ▲
                </button>
                <span className='text-xs text-gray-500'>M</span>
                <button
                  onClick={() => adjustTime('from', 'minutes', 'down')}
                  className='text-gray-500 hover:text-white text-xs p-1'
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
          {/* To Time */}
          <div className='text-center'>
            <div className='text-gray-400 text-lg mb-4'>To</div>
            <div
              className={`flex items-center gap-2 px-6 py-4 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                activeField === 'to'
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onClick={() => setActiveField('to')}
            >
              <span className='text-white text-2xl font-light min-w-[80px]'>
                {formatTime(toTime)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePeriod('to');
                }}
                className='text-gray-400 hover:text-white text-xl ml-2 transition-colors'
              >
                {toTime.period}
              </button>
            </div>
            {/* Fine Controls for To Time */}
            <div className='flex gap-2 mt-3 justify-center'>
              <div className='flex flex-col items-center'>
                <button
                  onClick={() => adjustTime('to', 'hours', 'up')}
                  className='text-gray-500 hover:text-white text-xs p-1'
                >
                  ▲
                </button>
                <span className='text-xs text-gray-500'>H</span>
                <button
                  onClick={() => adjustTime('to', 'hours', 'down')}
                  className='text-gray-500 hover:text-white text-xs p-1'
                >
                  ▼
                </button>
              </div>
              <div className='flex flex-col items-center'>
                <button
                  onClick={() => adjustTime('to', 'minutes', 'up')}
                  className='text-gray-500 hover:text-white text-xs p-1'
                >
                  ▲
                </button>
                <span className='text-xs text-gray-500'>M</span>
                <button
                  onClick={() => adjustTime('to', 'minutes', 'down')}
                  className='text-gray-500 hover:text-white text-xs p-1'
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Confirm and Cancel Buttons */}
        <button
          className='w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-medium py-4 rounded-full mt-2 shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200'
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button className='mt-4 text-gray-400 hover:text-white underline' onClick={onClose}>
          Cancel
        </button>
        {/* Instructions */}
        <div className='mt-8 text-gray-500 text-center max-w-md'>
          <p className='mb-2'>Select "From" or "To" then drag the clock hands to set time</p>
          <p className='text-sm'>
            <span className='text-cyan-400'>Blue hand (short)</span> = Hours •
            <span className='text-cyan-400'> Blue hand (long)</span> = Minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
