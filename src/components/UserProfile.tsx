import React, { useState } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';

interface UserProfileProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export default function UserProfile({ isAuthenticated, onLogin, onLogout }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <button
        onClick={onLogin}
        className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2 border border-indigo-100"
      >
        <User className="w-4 h-4" />
        <span>Login</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 group focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 p-0.5">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 animate-scale-up">
          <button
            onClick={() => {
              setIsOpen(false);
              // Handle settings
            }}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}