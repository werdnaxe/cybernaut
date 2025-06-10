import React from 'react';

const TextInputSubmission = ({ value, onChange }) => {
  return (
    <textarea
      className="w-full p-4 border rounded-lg shadow-sm text-lg"
      rows={4}
      placeholder="Type your answer here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInputSubmission;
