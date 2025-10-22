import React, { useState } from 'react';
import { Slider, Checkbox, Button } from 'antd';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { ModalCloseIcon } from '../Common/SVG/svg.function';

const jobTitles = [
  'Retail Assistant',
  'Barista',
  'Cashier',
  'Food Delivery',
  'Freelance Writer',
  'Content Creator',
];
const locations = ['Remote', 'On-site', 'Hybrid'];
const employmentTypes = ['Full-time', 'Part-time', 'Contract'];
const remoteOptions = ['Remote', 'On-site'];
const categories = ['Tech', 'Healthcare', 'Education', 'Finance'];
const jobFunctions = ['Development', 'Design', 'Marketing', 'Sales'];
const skills = ['React', 'Node.js', 'Figma', 'Python', 'SQL'];
const dateOptions = ['Last 24 hours', 'Last 7 days', 'Last 30 days'];

function ExpandableCheckboxSection({ label, options, selected, setSelected }) {
  const [open, setOpen] = useState(false);

  const toggleOption = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div className='pb-3 mb-3 border-b border-[#333] last:border-none last:mb-0 last:pb-0'>
      <div
        className='flex justify-between items-center cursor-pointer mb-1'
        onClick={() => setOpen(!open)}
      >
        <h4 className='text-sm font-semibold text-white'>{label}</h4>
        {open ? (
          <ChevronUp size={18} className='text-gray-400' />
        ) : (
          <ChevronDown size={18} className='text-gray-400' />
        )}
      </div>
      {open && (
        <div className='mt-2 space-y-1 max-h-28 overflow-y-auto pr-1'>
          {options.map((opt) => (
            <label key={opt} className='flex items-center gap-2 text-white text-sm'>
              <Checkbox checked={selected.includes(opt)} onChange={() => toggleOption(opt)} />
              {opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MentorFilterDropdown({ onApply, onClose }) {
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedEmployment, setSelectedEmployment] = useState([]);
  const [selectedRemote, setSelectedRemote] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedJobFunction, setSelectedJobFunction] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [salary, setSalary] = useState(500);

  const handleApply = () => {
    onApply({
      jobTitles: selectedTitles,
      locations: selectedLocations,
      employmentTypes: selectedEmployment,
      remoteType: selectedRemote,
      industry: selectedIndustry,
      jobFunction: selectedJobFunction,
      skills: selectedSkills,
      datePosted: selectedDate,
      salary,
    });
    onClose();
  };

  const clearAll = () => {
    setSelectedTitles([]);
    setSelectedLocations([]);
    setSelectedEmployment([]);
    setSelectedRemote([]);
    setSelectedIndustry([]);
    setSelectedJobFunction([]);
    setSelectedSkills([]);
    setSelectedDate([]);
    setSalary(500);
  };

  return (
    <div className='absolute top-20 right-6 z-50 bg-[#1f1f1f] text-white p-6 rounded-2xl w-[340px] shadow-lg overflow-y-auto max-h-[90vh]'>
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-semibold'>Filter</h3>
        <Button onClick={onClose} type='text'>
          <ModalCloseIcon size={14} className='text-gray-400' />
        </Button>
      </div>
      <hr></hr>
      {/* Filter Sections */}
      <ExpandableCheckboxSection
        label='Job Title'
        options={jobTitles}
        selected={selectedTitles}
        setSelected={setSelectedTitles}
      />
      <hr></hr>
      <ExpandableCheckboxSection
        label='Location'
        options={locations}
        selected={selectedLocations}
        setSelected={setSelectedLocations}
      />
      <hr></hr>
      <ExpandableCheckboxSection
        label='Employment Type'
        options={employmentTypes}
        selected={selectedEmployment}
        setSelected={setSelectedEmployment}
      />
      <hr></hr>
      <ExpandableCheckboxSection
        label='Remote / On-site'
        options={remoteOptions}
        selected={selectedRemote}
        setSelected={setSelectedRemote}
      />
      <hr></hr>
      <ExpandableCheckboxSection
        label='Industry / Category'
        options={categories}
        selected={selectedIndustry}
        setSelected={setSelectedIndustry}
      />
      <hr></hr>
      <ExpandableCheckboxSection
        label='Job Function'
        options={jobFunctions}
        selected={selectedJobFunction}
        setSelected={setSelectedJobFunction}
      />
      <hr></hr>
      <ExpandableCheckboxSection
        label='Skills / Tools'
        options={skills}
        selected={selectedSkills}
        setSelected={setSelectedSkills}
      />
      <hr></hr>
      <ExpandableCheckboxSection
        label='Date Posted'
        options={dateOptions}
        selected={selectedDate}
        setSelected={setSelectedDate}
      />
      <hr></hr>
      {/* Salary Range */}
      <div className='mb-5 mt-1'>
        <h4 className='text-sm font-semibold text-white mb-2'>Salary Range</h4>
        <Slider
          min={0}
          max={1000}
          value={salary}
          onChange={(val) => setSalary(val)}
          tooltip={{ open: true }}
        />
        <p className='text-right text-sm mt-1'>{salary}$</p>
      </div>

      {/* Action Buttons */}
      <div className='flex justify-between gap-2 mt-5'>
        <Button className='w-1/2' onClick={clearAll}>
          Clear All
        </Button>
        <Button type='primary' className='w-1/2 bg-purple-600 text-white' onClick={handleApply}>
          Apply Filter
        </Button>
      </div>
    </div>
  );
}

// // import React, { useState } from "react";
// // import { Slider, Checkbox, Input, Button } from "antd";
// // import { X } from "lucide-react";

// // const jobTitles = [
// //   "Retail Assistant", "Barista", "Cashier", "Food Delivery",
// //   "Freelance Writer", "Content Creator", "Data Entry Operator", "Photographer"
// // ];

// // const locations = ["Remote", "On-site", "Hybrid"];
// // const employmentTypes = ["Full-time", "Part-time", "Contract"];

// // export default function MentorFilterDropdown({ onApply, onClose }) {
// //   const [selectedTitles, setSelectedTitles] = useState([]);
// //   const [selectedLocation, setSelectedLocation] = useState("");
// //   const [employmentType, setEmploymentType] = useState("");
// //   const [salary, setSalary] = useState(500);

// //   const handleApply = () => {
// //     onApply({
// //       jobTitles: selectedTitles,
// //       location: selectedLocation,
// //       employmentType,
// //       salary,
// //     });
// //     onClose();
// //   };

// //   const clearAll = () => {
// //     setSelectedTitles([]);
// //     setSelectedLocation("");
// //     setEmploymentType("");
// //     setSalary(500);
// //   };

// //   return (
// //     <div className="absolute top-20 right-6 z-50 bg-[#1f1f1f] text-white p-5 rounded-xl w-[300px] shadow-lg">
// //       <div className="flex justify-between items-center mb-3">
// //         <h3 className="text-lg font-semibold">Filter</h3>
// //         <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
// //       </div>

// //       {/* Job Title */}
// //       <div className="mb-4">
// //         <h4 className="text-sm font-semibold mb-2">Job Title</h4>
// //         <Input.Search placeholder="Search.." className="mb-2" />
// //         <div className="max-h-32 overflow-auto pr-2">
// //           {jobTitles.map((title) => (
// //             <Checkbox
// //               key={title}
// //               checked={selectedTitles.includes(title)}
// //               onChange={() => {
// //                 setSelectedTitles((prev) =>
// //                   prev.includes(title)
// //                     ? prev.filter((t) => t !== title)
// //                     : [...prev, title]
// //                 );
// //               }}
// //             >
// //               {title}
// //             </Checkbox>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Location */}
// //       <div className="mb-4">
// //         <h4 className="text-sm font-semibold mb-2">Location</h4>
// //         <select
// //           value={selectedLocation}
// //           onChange={(e) => setSelectedLocation(e.target.value)}
// //           className="w-full p-2 bg-[#2a2a2a] text-white rounded-md"
// //         >
// //           <option value="">Select Location</option>
// //           {locations.map((loc) => (
// //             <option key={loc} value={loc}>{loc}</option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Employment Type */}
// //       <div className="mb-4">
// //         <h4 className="text-sm font-semibold mb-2">Employment Type</h4>
// //         <select
// //           value={employmentType}
// //           onChange={(e) => setEmploymentType(e.target.value)}
// //           className="w-full p-2 bg-[#2a2a2a] text-white rounded-md"
// //         >
// //           <option value="">Select Type</option>
// //           {employmentTypes.map((type) => (
// //             <option key={type} value={type}>{type}</option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Salary */}
// //       <div className="mb-4">
// //         <h4 className="text-sm font-semibold mb-2">Salary Range</h4>
// //         <Slider
// //           min={0}
// //           max={1000}
// //           value={salary}
// //           onChange={(val) => setSalary(val)}
// //           tooltip={{ open: true }}
// //         />
// //         <p className="text-right text-sm">{salary}$</p>
// //       </div>

// //       {/* Buttons */}
// //       <div className="flex justify-between gap-2">
// //         <Button className="w-1/2" onClick={clearAll}>Clear All</Button>
// //         <Button type="primary" className="w-1/2 bg-purple-600" onClick={handleApply}>Apply Filter</Button>
// //       </div>
// //     </div>
// //   );
// // }

// // components/MentorFilterDropdown.jsx
// import React, { useState } from "react";
// import { Slider, Checkbox, Button } from "antd";
// import { X } from "lucide-react";

// const jobTitles = ["Retail Assistant", "Barista", "Cashier", "Food Delivery", "Freelance Writer", "Content Creator"];
// const locations = ["Remote", "On-site", "Hybrid"];
// const employmentTypes = ["Full-time", "Part-time", "Contract"];
// const remoteOptions = ["Remote", "On-site"];
// const categories = ["Tech", "Healthcare", "Education", "Finance"];
// const jobFunctions = ["Development", "Design", "Marketing", "Sales"];
// const skills = ["React", "Node.js", "Figma", "Python", "SQL"];
// const dateOptions = ["Last 24 hours", "Last 7 days", "Last 30 days"];

// export default function MentorFilterDropdown({ onApply, onClose }) {
//   const [selectedTitles, setSelectedTitles] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [employmentType, setEmploymentType] = useState("");
//   const [salary, setSalary] = useState(500);
//   const [remoteType, setRemoteType] = useState("");
//   const [industry, setIndustry] = useState("");
//   const [jobFunction, setJobFunction] = useState("");
//   const [skill, setSkill] = useState("");
//   const [datePosted, setDatePosted] = useState("");

//   const handleApply = () => {
//     onApply({
//       jobTitles: selectedTitles,
//       location: selectedLocation,
//       employmentType,
//       salary,
//       remoteType,
//       industry,
//       jobFunction,
//       skill,
//       datePosted,
//     });
//     onClose();
//   };

//   const clearAll = () => {
//     setSelectedTitles([]);
//     setSelectedLocation("");
//     setEmploymentType("");
//     setSalary(500);
//     setRemoteType("");
//     setIndustry("");
//     setJobFunction("");
//     setSkill("");
//     setDatePosted("");
//   };

//   const renderSelect = (label, value, setter, options) => (
//     <div className="mb-4">
//       <h4 className="text-sm font-semibold mb-2 text-white">{label}</h4>
//       <select
//         value={value}
//         onChange={(e) => setter(e.target.value)}
//         className="w-full p-2 bg-[#2a2a2a] text-white rounded-md"
//       >
//         <option value="">Select {label}</option>
//         {options.map((opt) => (
//           <option key={opt} value={opt}>{opt}</option>
//         ))}
//       </select>
//     </div>
//   );

//   return (
//     <div className="absolute top-20 right-6 z-50 bg-[#1f1f1f] text-white p-5 rounded-xl w-[320px] shadow-lg overflow-y-auto max-h-[90vh]">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Filter</h3>
//         <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
//       </div>

//       {/* Job Title */}
//       <div className="mb-4">
//         <h4 className="text-sm font-semibold mb-2 text-white">Job Title</h4>
//         <div className="max-h-32 overflow-auto pr-2">
//           {jobTitles.map((title) => (
//             <Checkbox
//               key={title}
//               checked={selectedTitles.includes(title)}
//               onChange={() => {
//                 setSelectedTitles((prev) =>
//                   prev.includes(title)
//                     ? prev.filter((t) => t !== title)
//                     : [...prev, title]
//                 );
//               }}
//               className="text-white block mb-1"
//             >
//               {title}
//             </Checkbox>
//           ))}
//         </div>
//       </div>

//       {/* Location */}
//       {renderSelect("Location", selectedLocation, setSelectedLocation, locations)}

//       {/* Employment Type */}
//       {renderSelect("Employment Type", employmentType, setEmploymentType, employmentTypes)}

//       {/* Salary Range */}
//       <div className="mb-4">
//         <h4 className="text-sm font-semibold mb-2 text-white">Salary Range</h4>
//         <Slider
//           min={0}
//           max={1000}
//           value={salary}
//           onChange={(val) => setSalary(val)}
//           tooltip={{ open: true }}
//         />
//         <p className="text-right text-sm">{salary}$</p>
//       </div>

//       {/* Additional Filters */}
//       {renderSelect("Remote / On-site", remoteType, setRemoteType, remoteOptions)}
//       {renderSelect("Industry / Category", industry, setIndustry, categories)}
//       {renderSelect("Job Function", jobFunction, setJobFunction, jobFunctions)}
//       {renderSelect("Skills / Tools", skill, setSkill, skills)}
//       {renderSelect("Date Posted", datePosted, setDatePosted, dateOptions)}

//       {/* Action Buttons */}
//       <div className="flex justify-between gap-2 mt-6">
//         <Button className="w-1/2" onClick={clearAll}>Clear All</Button>
//         <Button type="primary" className="w-1/2 bg-purple-600" onClick={handleApply}>
//           Apply Filter
//         </Button>
//       </div>
//     </div>
//   );
// }
