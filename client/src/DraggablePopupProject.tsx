import React, { useState, useEffect, useRef } from 'react';
import './CSS/App.css';

interface DraggablePopupProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const DraggablePopupProject: React.FC<DraggablePopupProps> = ({ title, content, onClose}) => {
  const [position, setPosition] = useState({ x: 200, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
  const desktop = popupRef.current?.parentElement;
  if (!desktop || !popupRef.current) return;

  const desktopRect = desktop.getBoundingClientRect();
  const popupRect = popupRef.current.getBoundingClientRect();

  setPosition({
    x: (desktopRect.width - popupRect.width) / 2,
    y: 0, 
  });
}, []);


  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    // Calculate offset relative to the popup
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

      // Calculate new position relative to desktop
      let newX = e.clientX - offset.x - desktopRect.left;
      let newY = e.clientY - offset.y - desktopRect.top;

      // Clamp position so popup stays inside desktop
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
  }, [isDragging, offset]); // Include dependencies

  return (
    <div
      className={`projects-popup`} 
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

export default DraggablePopupProject;
