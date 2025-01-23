import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

interface SoundPad {
  id: string;
  note: string;
  frequency: number;
  label: string;
  color: string;
}

const pads: SoundPad[] = [
  { id: '1', note: 'C4', frequency: 261.63, label: 'Root', color: 'from-purple-500 to-indigo-500' },
  { id: '2', note: 'E4', frequency: 329.63, label: 'Third', color: 'from-teal-500 to-cyan-500' },
  { id: '3', note: 'G4', frequency: 392.00, label: 'Fifth', color: 'from-pink-500 to-rose-500' },
  { id: '4', note: 'A4', frequency: 440.00, label: 'Sixth', color: 'from-amber-500 to-yellow-500' },
  { id: '5', note: 'C5', frequency: 523.25, label: 'Octave', color: 'from-emerald-500 to-green-500' },
  { id: '6', note: '432Hz', frequency: 432.00, label: 'Healing', color: 'from-violet-500 to-purple-500' },
  { id: '7', note: '528Hz', frequency: 528.00, label: 'Solfeggio', color: 'from-blue-500 to-indigo-500' },
  { id: '8', note: '639Hz', frequency: 639.00, label: 'Heart', color: 'from-rose-500 to-pink-500' },
];

const SoundPad: React.FC = () => {
  const [synths, setSynths] = useState<Record<string, Tone.Synth>>({});
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Create synths for each pad
    const newSynths: Record<string, Tone.Synth> = {};
    pads.forEach(pad => {
      newSynths[pad.id] = new Tone.Synth({
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      }).toDestination();
    });
    setSynths(newSynths);

    // Cleanup
    return () => {
      Object.values(newSynths).forEach(synth => synth.dispose());
    };
  }, []);

  const handlePadPress = async (padId: string, frequency: number) => {
    if (!synths[padId]) return;

    // Initialize Tone.js if needed
    if (Tone.context.state !== 'running') {
      await Tone.start();
    }

    // Play the note
    synths[padId].triggerAttackRelease(frequency, '0.4s');
    
    // Visual feedback
    setActiveButtons(prev => new Set([...prev, padId]));
    setTimeout(() => {
      setActiveButtons(prev => {
        const next = new Set(prev);
        next.delete(padId);
        return next;
      });
    }, 200);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-light text-center mb-8 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-purple-200 to-pink-200">
        Sound Pad
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {pads.map((pad) => (
          <button
            key={pad.id}
            onClick={() => handlePadPress(pad.id, pad.frequency)}
            className={`
              aspect-square rounded-xl p-4
              bg-gradient-to-br ${pad.color}
              ${activeButtons.has(pad.id) ? 'opacity-100 scale-95' : 'opacity-80 scale-100'}
              transition-all duration-200
              hover:opacity-100 hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-white/20
              shadow-lg hover:shadow-xl
              flex flex-col items-center justify-center
              text-white font-light
            `}
          >
            <span className="text-lg mb-1">{pad.note}</span>
            <span className="text-sm opacity-80">{pad.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SoundPad; 