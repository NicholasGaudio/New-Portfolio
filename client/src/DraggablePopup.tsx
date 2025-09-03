import React, { useState, useEffect } from 'react';
import './App.css';

interface DraggablePopupProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const DraggablePopup: React.FC<DraggablePopupProps> = ({ title, content, onClose }) => {
  const [position, setPosition] = useState({ x: 200, y: 100 }); // initial position
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startDrag = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onDrag = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);
    };
  });

  // 🔍 This is the actual return block that renders the popup
  return (
    <div
      className="popup"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        position: 'absolute',
      }}
    >
      <div className="popup-header" onMouseDown={startDrag}>
        <span>{title}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className="popup-content">{content}</div>
    </div>
  );
};

export default DraggablePopup;
