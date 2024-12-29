'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ImageManipulatorProps {
  result: string;
}

const ImageManipulator: React.FC<ImageManipulatorProps> = ({ result }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 800, height: 600 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const calculateSize = useCallback(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return { width: 800, height: 600 };

    ctx.font = '12px monospace';
    const padding = 20;
    const lineHeight = 14;
    const maxWidth = 800 - padding * 2;

    const words = result.split('');
    let line = '';
    let y = padding;
    let maxLineWidth = 0;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i];
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth) {
        maxLineWidth = Math.max(maxLineWidth, metrics.width);
        line = words[i];
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    y += lineHeight; // Add the last line

    return {
      width: Math.min(800, Math.max(100, maxLineWidth + padding * 2)),
      height: Math.max(50, y + padding)
    };
  }, [result]);

  useEffect(() => {
    const newSize = calculateSize();
    setImageSize(newSize);
  }, [calculateSize]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = imageSize.width;
    canvas.height = imageSize.height;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.font = '12px monospace';
    
    const padding = 20;
    const maxWidth = imageSize.width - padding * 2;
    let x = padding;
    let y = padding + 12;
    const lineHeight = 14;

    const words = result.split('');
    let line = '';
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = line + word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth) {
        ctx.fillText(line, x, y);
        line = word;
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);

    drawHandles(ctx);
  }, [imageSize, result]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const drawHandles = (ctx: CanvasRenderingContext2D) => {
    const handleSize = 10;
    
    const positions = [
      { x: 0, y: 0 },
      { x: imageSize.width - handleSize, y: 0 },
      { x: 0, y: imageSize.height - handleSize },
      { x: imageSize.width - handleSize, y: imageSize.height - handleSize }
    ];

    positions.forEach(pos => {
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(pos.x, pos.y, handleSize, handleSize);
    });
  };

  const getHandleAtPosition = (x: number, y: number): string | null => {
    const handleSize = 10;
    const margin = 5;

    if (x < handleSize + margin && y < handleSize + margin) return 'topLeft';
    if (x > imageSize.width - handleSize - margin && y < handleSize + margin) return 'topRight';
    if (x < handleSize + margin && y > imageSize.height - handleSize - margin) return 'bottomLeft';
    if (x > imageSize.width - handleSize - margin && y > imageSize.height - handleSize - margin) return 'bottomRight';

    return null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const handle = getHandleAtPosition(x, y);
    if (handle) {
      setIsResizing(true);
      setResizeHandle(handle);
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (isResizing) {
      canvas.style.cursor = 'nwse-resize';
    
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;

      let newWidth = imageSize.width;
      let newHeight = imageSize.height;

      switch (resizeHandle) {
        case 'topLeft':
        case 'bottomLeft':
          newWidth = Math.max(100, imageSize.width - deltaX);
          break;
        case 'topRight':
        case 'bottomRight':
          newWidth = Math.max(100, imageSize.width + deltaX);
          break;
      }

      switch (resizeHandle) {
        case 'topLeft':
        case 'topRight':
          newHeight = Math.max(50, imageSize.height - deltaY);
          break;
        case 'bottomLeft':
        case 'bottomRight':
          newHeight = Math.max(50, imageSize.height + deltaY);
          break;
      }

      setImageSize({ width: newWidth, height: newHeight });
      setStartPos({ x: e.clientX, y: e.clientY });
    } else {
      const handle = getHandleAtPosition(x, y);
      canvas.style.cursor = handle ? 'nwse-resize' : 'default';
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeHandle(null);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = 'default';
    }
  };

  return (
    <div className="mt-4">
      <div className="relative bg-gray-50 p-4 rounded-lg">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="border-2 border-gray-300 rounded-lg"
        />
        <div className="mt-4 text-sm text-gray-500">
          {Math.round(imageSize.width)} x {Math.round(imageSize.height)} px
        </div>
      </div>
    </div>
  );
};

export default ImageManipulator;

