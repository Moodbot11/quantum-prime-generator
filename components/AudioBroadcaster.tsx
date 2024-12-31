'use client'

import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

interface AudioBroadcasterProps {
  encodedMessage: string;
}

const AudioBroadcaster: React.FC<AudioBroadcasterProps> = ({ encodedMessage }) => {
  const audioContext = useRef<AudioContext | null>(null);
  const sourceNode = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [baseFrequency, setBaseFrequency] = useState(432);
  const [status, setStatus] = useState('');

  useEffect(() => {
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const createWaveform = (waveCode: string) => {
    const ctx = audioContext.current!;
    const sampleRate = ctx.sampleRate;
    const duration = 0.1; // 100ms pulse duration
    const samples = sampleRate * duration;
    const buffer = ctx.createBuffer(1, samples, sampleRate);
    const channel = buffer.getChannelData(0);

    for (let i = 0; i < samples; i++) {
      const t = i / sampleRate;
      let sample = 0;
      for (let j = 0; j < waveCode.length; j++) {
        const digit = parseInt(waveCode[j], 10) || 0; // Use 0 if parsing fails
        const frequency = baseFrequency * (1 + digit * 0.1);
        sample += Math.sin(2 * Math.PI * frequency * t);
      }
      channel[i] = sample / waveCode.length; // Normalize
    }

    return buffer;
  };

  const playEncodedAudio = () => {
    try {
      if (!audioContext.current) {
        audioContext.current = new AudioContext();
      }

      const ctx = audioContext.current;

      // Create the waveform from the encoded message
      const buffer = createWaveform(encodedMessage);

      // Create a buffer source node
      sourceNode.current = ctx.createBufferSource();
      sourceNode.current.buffer = buffer;
      sourceNode.current.loop = true;

      // Create a gain node for volume control
      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.gain.setValueAtTime(volume, ctx.currentTime);

      // Connect the nodes
      sourceNode.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(ctx.destination);

      // Start playing
      sourceNode.current.start();
      setIsPlaying(true);
      setStatus('Broadcasting: The wave code is now being transmitted.');
    } catch (error) {
      console.error('Error starting audio playback:', error);
      setStatus('Error: Failed to start broadcasting. Please try again.');
    }
  };

  const stopAudio = () => {
    if (sourceNode.current) {
      sourceNode.current.stop();
      sourceNode.current.disconnect();
      setIsPlaying(false);
      setStatus('Broadcasting stopped: The wave code transmission has ended.');
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVolume[0], audioContext.current!.currentTime);
    }
  };

  const handleFrequencyChange = (newFrequency: number[]) => {
    setBaseFrequency(newFrequency[0]);
  };

  return (
    <div className="space-y-4">
      <div className="space-x-2">
        <Button onClick={playEncodedAudio} disabled={isPlaying || !encodedMessage.trim()}>
          {isPlaying ? 'Broadcasting...' : 'Broadcast Wave Code'}
        </Button>
        <Button onClick={stopAudio} disabled={!isPlaying}>
          Stop
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="volume-slider" className="block text-sm font-medium text-gray-700">
          Volume: {Math.round(volume * 100)}%
        </Label>
        <Slider
          id="volume-slider"
          min={0}
          max={1}
          step={0.01}
          value={[volume]}
          onValueChange={handleVolumeChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="frequency-slider" className="block text-sm font-medium text-gray-700">
          Base Frequency: {baseFrequency} Hz
        </Label>
        <Slider
          id="frequency-slider"
          min={20}
          max={2000}
          step={1}
          value={[baseFrequency]}
          onValueChange={handleFrequencyChange}
        />
      </div>
      {status && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p className="text-sm">{status}</p>
        </div>
      )}
    </div>
  );
};

export default AudioBroadcaster;

