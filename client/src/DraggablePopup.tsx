import React, { useState, useEffect, useRef } from 'react';
import './App.css';

interface DraggablePopupProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const DraggablePopup: React.FC<DraggablePopupProps> = ({ title, content, onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  if (!popupRef.current) return;
  const popupRect = popupRef.current.getBoundingClientRect();
  const desktop = popupRef.current.parentElement;
  if (!desktop) return;

  const desktopRect = desktop.getBoundingClientRect();
  const taskbarHeight = 80; // Approx. height for your taskbar

  // Calculate center position
  const centerX = (desktopRect.width - popupRect.width) / 2;
  const centerY = (desktopRect.height - popupRect.height - taskbarHeight) / 2;

  // Small random offset (±50px)
  const offsetX = (Math.random() - 0.5) * 100;
  const offsetY = (Math.random() - 0.5) * 100;

  setPosition({
    x: Math.max(0, Math.min(centerX + offsetX, desktopRect.width - popupRect.width)),
    y: Math.max(0, Math.min(centerY + offsetY, desktopRect.height - popupRect.height - taskbarHeight)),
  });
}, []);

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onDrag = (e: MouseEvent) => {
    if (isDragging && popupRef.current) {
      const desktop = popupRef.current.parentElement;
      if (!desktop) return;

      const desktopRect = desktop.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();

      let newX = e.clientX - offset.x - desktopRect.left;
      let newY = e.clientY - offset.y - desktopRect.top;

      newX = Math.max(0, Math.min(newX, desktopRect.width - popupRect.width));
      newY = Math.max(0, Math.min(newY, desktopRect.height - popupRect.height));

      setPosition({ x: newX, y: newY });
    }
  };

  const stopDrag = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);
    };
  }, [isDragging, offset]);

  return (
    <div
      className="popup"
      ref={popupRef}
      style={{ top: position.y, left: position.x, position: 'absolute' }}
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
