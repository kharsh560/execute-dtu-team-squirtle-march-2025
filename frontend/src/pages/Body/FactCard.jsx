import React from 'react';
import { Check, X } from 'lucide-react';

function FactCard({ fact, onClick, isDarkMode }) {
  return (
    <button
      onClick={onClick}
      className="block w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{fact.title}</h3>
        {fact.result ? (
          <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
        ) : (
          <X className="h-5 w-5 text-red-500 dark:text-red-400" />
        )}
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 capitalize">{fact.platform}</p>
    </button>
  );
}

export default FactCard;