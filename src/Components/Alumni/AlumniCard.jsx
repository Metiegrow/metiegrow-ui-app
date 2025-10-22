import React from 'react';
import { Star as StarIcon } from 'lucide-react';
import { NextButtonPurpleIcon } from '../Common/SVG/svg.function';

export default function AlumniCard({ alumni, onClick, backendUrl }) {
  return (
    <div className="bg-cardblack rounded-[20px] px-4 pt-4 flex flex-col h-[240px]">
      {/* Header */}
      <div className="flex-1 min-h-0 mb-4">
        <div className="flex justify-between items-start gap-3">
          {/* Avatar + Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center flex-shrink-0">
              {alumni.imageUrl ? (
                <img
                  src={backendUrl ? `${backendUrl}/${alumni.imageUrl}` : alumni.imageUrl}
                  alt={`${alumni.firstName} ${alumni.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-sm sm:text-base font-bold">
                  {`${alumni.firstName?.charAt(0) || ''}${alumni.lastName?.charAt(0) || ''}`}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                {alumni.firstName} {alumni.lastName}
              </h3>
              <p className="text-[#9b9b9b] text-xs sm:text-sm truncate">
                {alumni.jobTitle || 'Product Manager'}
              </p>
              <p className="text-[#47cf99] font-bold text-xs sm:text-sm truncate">
                {alumni.company || alumni.batchYear}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center bg-[#3c3803] px-2 py-0.5 rounded-full h-6 flex-shrink-0">
            <StarIcon size={14} className="text-yellow-400 mr-1" />
            <span className="text-yellow-300 font-semibold text-xs">
              {alumni.star?.toFixed(1) || '5.0'}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-3 flex flex-wrap gap-1.5 max-h-[50px] overflow-hidden">
          {alumni.skills?.slice(0, 3).map((skill, i) => (
            <span
              key={i}
              className="bg-[#131313] text-white text-[11px] sm:text-xs px-2 py-0.5 rounded-full font-medium truncate max-w-[100px]"
              title={skill}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer (price + button) */}
      <div className="flex items-center justify-between mt-3">
        <div className="truncate">
          <span className="text-base sm:text-lg font-bold text-white">
            $ {alumni.price}
          </span>
          <span className="text-gray-400 text-xs ml-1">/hr</span>
        </div>
        <div className="cursor-pointer flex-shrink-0" onClick={onClick}>
          <NextButtonPurpleIcon className="text-purple-500 w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
