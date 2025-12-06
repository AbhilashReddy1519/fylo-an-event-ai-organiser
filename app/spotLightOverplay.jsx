'use client';
import React, { useEffect, useState } from 'react';

function SpotLightOverlay() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = e => {
      setVisible(true);
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handlePointerOut = e => {
      // If leaving window (not entering another element inside the window)
      if (e.relatedTarget === null) {
        setVisible(false);
        setPos({ x: -9999, y: -9999 }); // remove the spotlight completely
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('pointerout', handlePointerOut);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{
        display: visible ? 'block' : 'none',
        backgroundImage: `radial-gradient(
          circle at ${pos.x}px ${pos.y}px,
          #262829 0px,
          #141616 140px,
          transparent 300px
        )`,
        mixBlendMode: 'screen',
        zIndex: -1,
      }}
    />
  );
}

export default SpotLightOverlay;
