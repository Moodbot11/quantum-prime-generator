'use client'

import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button"

interface AudioBroadcasterProps {
  encodedMessage: string;
}

const AudioBroadcaster: React.FC<AudioBroadcasterProps> = ({ encodedMessage }) => {
  const audioContext = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playEncodedAudio = () => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }

    const ctx = audioContext.current;
    oscillatorRef.current = ctx.createOscillator();
    oscillatorRef.current.type = 'sine';

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);

    oscillatorRef.current.connect(gainNode);
    gainNode.connect(ctx.destination);

    let time = ctx.currentTime;
    const duration = 0.05; // 50ms per bit for faster playback
    
    // Convert the wave code to binary
    const binaryCode = encodedMessage.split('').map(char => {
      const binary = char.charCodeAt(0).toString(2).padStart(8, '0');
      return binary;
    }).join('');

    binaryCode.split('').forEach((bit) => {
      const frequency = bit === '0' ? 440 : 880; // A4 for 0, A5 for 1
      oscillatorRef.current!.frequency.setValueAtTime(frequency, time);
      time += duration;
    });

    oscillatorRef.current.start();
    oscillatorRef.current.stop(time);

    setIsPlaying(true);
    oscillatorRef.current.onended = () => setIsPlaying(false);
  };

  const stopAudio = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      setIsPlaying(false);
    }
  };

  const resetAudio = () => {
    stopAudio();
    if (audioContext.current) {
      audioContext.current.close();
      audioContext.current = null;
    }
  };

  return (
    <div className="space-x-2">
      <Button onClick={playEncodedAudio} disabled={isPlaying || !encodedMessage.trim()}>
        {isPlaying ? 'Broadcasting...' : 'Broadcast Wave Code'}
      </Button>
      <Button onClick={stopAudio} disabled={!isPlaying}>
        Stop
      </Button>
      <Button onClick={resetAudio}>
        Reset
      </Button>
    </div>
  );
};

export default AudioBroadcaster;

