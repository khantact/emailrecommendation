import React, { useState } from 'react';

interface ConfirmationDialogProps {
  message: string;
  onConfirm: (password: string) => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onConfirm, onCancel }) => {
  const [password, setPassword] = useState('');

  const handleConfirmClick = () => {
    // getPassword(password); 
    onConfirm(password);
    setPassword('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-indigo-700 to-indigo-500 rounded-lg p-6 ">
        <p className="text-center mb-4 text-peach">{message}</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-full mb-4 text-black"
          placeholder="Enter your password"
        />
        <div className="flex justify-center">
          <button className="btn-confirm mr-2 text-peach bg-green-600 hover:bg-green-700 rounded-md p-2 transition ease-in" onClick={handleConfirmClick}>Confirm</button>
          <button className="btn-cancel text-peach bg-red-600 hover:bg-red-700 rounded-md p-2 transition ease-in" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
