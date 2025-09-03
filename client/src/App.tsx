import React, { useState, useEffect } from 'react';
import DraggablePopup from './DraggablePopup';
import './App.css';

const App: React.FC = () => {
  const [time, setTime] = useState<string>(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [showAbout, setshowAbout] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  

  
  return (
    <div className="desktop">
      <div className = "desktop-icons">

          <div className = "icon"> 
            <img src = "/Photos/folder.png"/>
            <span>My Projects</span>
          </div>

          <div className = "icon" onClick= {() => setshowAbout(true)}> 
            <img src = "/Photos/word-logo.png"/>
            <span>About Me</span>
          </div>

          <a href="https://drive.google.com/file/d/1SDE4PWKveuXFHxW4iLIQsHnWw2T3e-tI/view" target="_blank" rel="noopener noreferrer" className = "icon"> 
            <img src = "/Photos/word-logo.png"/>
            <span>Resume</span>
          </a>

          <a href="https://linkedin.com/in/Nicholas-S-Gaudio" target="_blank" rel="noopener noreferrer" className = "icon"> 
            <img src = "/Photos/linkedin.png"/>
            <span>LinkedIn</span>
          </a>

          <a href="https://github.com/NicholasGaudio" target="_blank" rel="noopener noreferrer" className = "icon"> 
            <img src = "/Photos/github.png"/>
            <span>Github</span>
          </a>

          {showAbout && (
            <DraggablePopup
              title="About Me"
              content={<p>About MEEE</p>}
              onClose={() => setshowAbout(false)}
            />
          )}

      </div>
        
      <div className="taskbar">
        <div className="start-button">
          <img src="/Photos/window start.png" className="windows-large" />
          <img src="/Photos/small-start.png" className="windows-small" />
        </div>
        
        <div className="taskbar-icons">
        </div>

        <div className="taskbar-clock">
          {time}
        </div>
      </div>
    </div>
  );
};

export default App;
