import { CloseCircleFilled } from '@ant-design/icons';
import { Card } from 'antd';
import { useState, useRef, useEffect } from 'react';

export const SkillsInput = ({
  name = 'skills',
  value = [],
  onChange,
  error,
  placeholder = 'Type a skill and press Enter or Tab',
  maxSkills = 20,
  showCount = true,
  ...probs
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Debug: Log when value changes
  useEffect(() => {
    console.log('SkillsInput - Current skills:', value);
  }, [value]);

  // Ensure value is always an array
  const safeValue = Array.isArray(value) ? value : [];

  const addSkill = (skillText = inputValue.trim()) => {
    if (!skillText || safeValue.length >= maxSkills) return;

    // Prevent duplicates (case insensitive)
    const normalizedSkill = skillText.toLowerCase();
    if (safeValue.some((skill) => skill.toLowerCase() === normalizedSkill)) {
      return;
    }

    const newSkills = [...safeValue, skillText];
    console.log('Adding skill:', skillText, 'New skills:', newSkills);

    // Call parent's onChange
    if (onChange) {
      onChange({
        target: {
          name,
          value: newSkills,
        },
      });
    }
    setInputValue('');
  };

  const removeSkill = (index) => {
    console.log('Removing skill at index:', index, 'Current skills:', safeValue);
    const newSkills = safeValue.filter((_, i) => i !== index);
    console.log('New skills after removal:', newSkills);

    if (onChange) {
      onChange({
        target: {
          name,
          value: newSkills,
        },
      });
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
      case 'Tab':
        e.preventDefault();
        if (inputValue.trim()) {
          addSkill();
        }
        break;

      case 'Backspace':
        if (!inputValue.trim() && safeValue.length > 0) {
          e.preventDefault();
          removeSkill(safeValue.length - 1);
        }
        break;

      case ',':
        e.preventDefault();
        if (inputValue.trim()) {
          addSkill(inputValue.replace(',', '').trim());
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className=''>
      {/* Header with label and counter */}
      <div className='flex items-center justify-between'>
        <label className='block text-sm font-medium text-gray-200'>
          Skills {<span className='text-red-400'>*</span>}
        </label>

        {showCount && (
          <span className='text-xs text-gray-400'>
            {safeValue.length}/{maxSkills}
          </span>
        )}
      </div>

      {/* Input Container */}
      <Card
        bodyStyle={{
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 0,
          gap: 2,
        }}
        className={`
          relative flex-1 flex-row items-center overflow-x-auto overflow-y-hidden p-3
          border rounded-full transition-all duration-200 ease-in-out
          bg-transparent backdrop-blur-sm
          ${error ? 'border-red-500/50' : 'border-gray-600'}
          ${isFocused ? 'border-purple-500 ring-2 ring-purple-500' : 'hover:border-gray-500'}
          scrollbar-none
        `}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Skills Tags */}
        {safeValue.map((skill, idx) => (
          <div
            key={`${skill}-${idx}`}
            className='group relative flex items-center rounded-full px-3 py-1.5 
                     bg-cardblack border border-purple-500/30
                     hover:border-purple-400 transition-all duration-200'
          >
            <span className='pr-1 text-sm font-medium text-white'>{skill}</span>
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                console.log('Remove button clicked for:', skill, 'at index:', idx);
                removeSkill(idx);
              }}
              className='flex items-center justify-center w-4 h-4 text-gray-400 transition-colors duration-150 rounded-full hover:text-white hover:bg-red-500/20'
              aria-label={`Remove ${skill}`}
            >
              <CloseCircleFilled className='w-3 h-3' />
            </button>
          </div>
        ))}

        {/* Input Field */}
        <input
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={safeValue.length === 0 ? placeholder : ''}
          disabled={safeValue.length >= maxSkills}
          error={error}
          className={`
            flex-1 min-w-[120px] bg-transparent border-none outline-none
            text-white placeholder-gray-400 text-sm
            disabled:opacity-50 disabled:cursor-not-allowed
            ${safeValue.length === 0 ? 'w-full' : 'flex-grow'}
            px-2
          `}
        />

        {/* Add Button - Only show when there's input */}
        {inputValue.trim() && (
          <button
            type='button'
            onClick={() => addSkill()}
            disabled={safeValue.length >= maxSkills}
            className='flex items-center justify-center w-8 h-8 transition-all duration-200 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600'
          >
            <svg
              className='w-4 h-4 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={3}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
          </button>
        )}
      </Card>

      {error && <p className='text-sm text-red-400'>{error}</p>}
    </div>
  );
};

// import { CloseCircleFilled } from '@ant-design/icons';
// import { useState, useRef, useEffect } from 'react';

// export const SkillsInput = ({
//   name = 'skills',
//   value = [],
//   onChange,
//   error,
//   placeholder = 'Type a skill and press Enter or Tab',
//   maxSkills = 20,
//   showCount = true,
// }) => {
//   const [inputValue, setInputValue] = useState('');
//   const [isFocused, setIsFocused] = useState(false);
//   const inputRef = useRef(null);

//   // Auto-focus on mount
//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   const addSkill = (skillText = inputValue.trim()) => {
//     if (!skillText || value.length >= maxSkills) return;

//     // Prevent duplicates (case insensitive)
//     const normalizedSkill = skillText.toLowerCase();
//     if (value.some((skill) => skill.toLowerCase() === normalizedSkill)) {
//       return;
//     }

//     const newSkills = [...value, skillText];
//     onChange({
//       target: {
//         name,
//         value: newSkills,
//       },
//     });
//     setInputValue('');
//   };

//   const removeSkill = (index) => {
//     const newSkills = value.filter((_, i) => i !== index);
//     onChange({
//       target: {
//         name,
//         value: newSkills,
//       },
//     });
//   };

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleKeyDown = (e) => {
//     switch (e.key) {
//       case 'Enter':
//       case 'Tab':
//         e.preventDefault();
//         if (inputValue.trim()) {
//           addSkill();
//         }
//         break;

//       case 'Backspace':
//         if (!inputValue.trim() && value.length > 0) {
//           e.preventDefault();
//           removeSkill(value.length - 1);
//         }
//         break;

//       case ',':
//         e.preventDefault();
//         if (inputValue.trim()) {
//           addSkill(inputValue.replace(',', '').trim());
//         }
//         break;

//       default:
//         break;
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedText = e.clipboardData.getData('text');
//     const skills = pastedText
//       .split(/[,;\n]/)
//       .map((skill) => skill.trim())
//       .filter(Boolean);

//     if (skills.length > 1) {
//       // Add multiple skills from paste
//       const newSkills = [...value];
//       skills.forEach((skill) => {
//         const normalizedSkill = skill.toLowerCase();
//         if (
//           !newSkills.some((existing) => existing.toLowerCase() === normalizedSkill) &&
//           newSkills.length < maxSkills
//         ) {
//           newSkills.push(skill);
//         }
//       });

//       onChange({
//         target: {
//           name,
//           value: newSkills,
//         },
//       });
//     } else {
//       // Single skill paste
//       setInputValue(pastedText);
//     }
//   };

//   return (
//     <div className='space-y-3'>
//       {/* Header with label and counter */}
//       <div className='flex items-center justify-between'>
//         <label className='block text-sm font-medium text-gray-200'>
//           Skills <span className='text-red-400'>*</span>
//         </label>

//         {showCount && (
//           <span className='text-xs text-gray-400'>
//             {value.length}/{maxSkills}
//           </span>
//         )}
//       </div>

//       {/* Input Container with enhanced focus states */}
//       <div
//         className={`
//     relative flex flex-row items-center overflow-x-auto overflow-y-hidden p-3 gap-1
//     border-1 rounded-full transition-all duration-200 ease-in-out
//     bg-transparent backdrop-blur-sm
//     ${error ? 'border-red-500/50' : 'border-gray-600'}
//     ${isFocused ? 'border-purple-500 ring-2 ring-purple-500' : 'hover:border-gray-500'}
//     scrollbar-none
//   `}
//         onClick={() => inputRef.current?.focus()}
//       >
//         {/* Skills Tags */}
//         {value.map((skill, idx) => (
//           <div
//             key={`${skill}-${idx}`}
//             className='group relative flex items-center rounded-full px-3 py-1.5
//                      bg-cardblack
//                      border border-purple-500/30
//                      hover:from-purple-600/30 hover:to-blue-600/30
//                      transition-all duration-200'
//           >
//             <span className='pr-1 text-sm font-medium text-white'>{skill}</span>
//             <button
//               type='button'
//               onClick={(e) => {
//                 e.stopPropagation();
//                 removeSkill(idx);
//               }}
//               className='flex items-center justify-center w-4 h-4 text-black transition-colors duration-150 border-0 rounded-full hover:text-white hover:bg-red-500/20'
//               aria-label={`Remove ${skill}`}
//             >
//               <CloseCircleFilled />
//             </button>

//             {/* Subtle hover effect */}
//             <div className='absolute inset-0 transition-opacity rounded-lg opacity-0 bg-white/5 group-hover:opacity-100' />
//           </div>
//         ))}

//         {/* Input Field */}
//         <input
//           ref={inputRef}
//           type='text'
//           value={inputValue}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           onPaste={handlePaste}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           placeholder={value.length === 0 ? placeholder : ''}
//           disabled={value.length >= maxSkills}
//           className={`
//             flex-1 min-w-[120px] bg-transparent border-none outline-none
//             text-white placeholder-gray-400 text-sm
//             disabled:opacity-50 disabled:cursor-not-allowed
//             ${value.length === 0 ? 'w-full' : 'flex-grow'}
//           `}
//         />

//         {/* Add Button - Only show when there's input */}
//         {inputValue.trim() && (
//           <button
//             type='button'
//             onClick={() => addSkill()}
//             disabled={value.length >= maxSkills}
//             className='flex items-center justify-center w-8 h-8 transition-all duration-200 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-600 hover:shadow-purple-500/25'
//           >
//             <svg
//               className='w-4 h-4 text-white'
//               fill='none'
//               stroke='currentColor'
//               viewBox='0 0 24 24'
//             >
//               <path
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 strokeWidth={3}
//                 d='M12 6v6m0 0v6m0-6h6m-6 0H6'
//               />
//             </svg>
//           </button>
//         )}
//       </div>

//       {/* Helper Text and Error */}
//       {/* <div className='flex flex-col space-y-1'>
//         {error && (
//           <div className='flex items-center gap-2 text-sm text-red-400'>
//             <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
//               <path
//                 fillRule='evenodd'
//                 d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
//                 clipRule='evenodd'
//               />
//             </svg>
//             {error}
//           </div>
//         )}

//         <div className='flex flex-wrap items-center gap-4 text-xs text-gray-400'>
//           <span>⏎ Enter or Tab to add</span>
//           <span>⌫ Backspace to remove last</span>
//           <span>, Comma to separate multiple</span>
//         </div>
//       </div> */}

//       {/* Progress Bar */}
//       {/* {maxSkills > 0 && (
//         <div className='w-full bg-gray-700 rounded-full h-1.5'>
//           <div
//             className='bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all duration-300'
//             style={{ width: `${(value.length / maxSkills) * 100}%` }}
//           />
//         </div>
//       )} */}
//     </div>
//   );
// };

// // Additional component for suggested skills
// export const SkillsInputWithSuggestions = ({ suggestions = [], ...props }) => {
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);

//   const filterSuggestions = (inputValue) => {
//     if (!inputValue.trim()) {
//       setFilteredSuggestions(suggestions.slice(0, 5));
//       return;
//     }

//     const filtered = suggestions
//       .filter((skill) => skill.toLowerCase().includes(inputValue.toLowerCase()))
//       .slice(0, 5);

//     setFilteredSuggestions(filtered);
//   };

//   return (
//     <div className='relative'>
//       <SkillsInput
//         {...props}
//         onInputChange={(value) => {
//           filterSuggestions(value);
//           setShowSuggestions(true);
//         }}
//         onFocus={() => setShowSuggestions(true)}
//         onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
//       />

//       {showSuggestions && filteredSuggestions.length > 0 && (
//         <div className='absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl'>
//           {filteredSuggestions.map((skill, idx) => (
//             <button
//               key={idx}
//               type='button'
//               className='w-full px-4 py-2 text-sm text-left text-gray-200 transition-colors hover:bg-purple-600/20 first:rounded-t-lg last:rounded-b-lg'
//               onClick={() => {
//                 // Logic to add skill
//                 setShowSuggestions(false);
//               }}
//             >
//               {skill}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
