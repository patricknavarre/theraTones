import React from 'react';
import SoundBathController from './features/soundBath/SoundBathController';
import SoundPad from './features/soundPad/SoundPad';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
      <SoundBathController />
      <SoundPad />
    </div>
  );
};

export default App; 