'use client'

import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button"

interface AudioBroadcasterProps {
  encodedMessage: string;
}

const AudioBroadcaster: React.FC<AudioBroadcasterProps> = ({ encodedMessage }) => {
  const audioContext = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playEncodedAudio = () => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }

    const ctx = audioContext.current;
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sine';

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    let time = ctx.currentTime;
    encodedMessage.split('').forEach((bit, index) => {
      const frequency = bit === '0' ? 440 : 880; // A4 for 0, A5 for 1
      oscillator.frequency.setValueAtTime(frequency, time);
      time += 0.1; // 100ms per bit
    });

    oscillator.start();
    oscillator.stop(time);

    setIsPlaying(true);
    oscillator.onended = () => setIsPlaying(false);
  };

  return (
    <Button onClick={playEncodedAudio} disabled={isPlaying}>
      {isPlaying ? 'Broadcasting...' : 'Broadcast as Audio'}
    </Button>
  );
};

export default AudioBroadcaster;

