'use client';

import React from 'react';
import { FaEye } from 'react-icons/fa';

interface CVDownloadButtonProps {
  cvPath: string;
  className?: string;
}

const CVDownloadButton: React.FC<CVDownloadButtonProps> = ({ cvPath, className = '' }) => {
  return (
    <a
      href={cvPath}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300 ${className}`}
    >
      <FaEye className="w-5 h-5" />
      View CV
    </a>
  );
};

export default CVDownloadButton;