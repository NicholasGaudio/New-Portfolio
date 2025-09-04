import React, { useState, useEffect } from 'react';
import DraggablePopup from './DraggablePopup';
import './App.css';

const App: React.FC = () => {
  const [time, setTime] = useState<string>(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [showAbout, setshowAbout] = useState(false)
  const [showPC, setshowPC] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  

  
  return (
    <div className="desktop">
      <div className = "desktop-icons">

          <div className = "icon" onClick={() => setshowPC(true)}> 
            <img src = "/Photos/pc.png"/>
            <span>My Computer</span>
          </div>

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

          <a href="mailto:ngaudio0920@gmail.com" target="_blank" rel="noopener noreferrer" className = "icon"> 
            <img src = "/Photos/email.png"/>
            <span>Email</span>
          </a>

          {showAbout && (
            <DraggablePopup
              title="About Me"
              content={<p>About MEEE</p>}
              onClose={() => setshowAbout(false)}
            />
          )}

          {showPC && (
            <DraggablePopup
              title="My Computer"
              content={
                <div>
                  <p> This portfolio is powered by a MongoDB database that stores all my project details, GitHub links, and more. 
                    The backend was built with Python’s FastAPI, while the frontend was crafted using Node.js and React. 
                    The hosting was done through AWS Lightsail. </p> 
                  <p><strong>Thanks for visiting, and enjoy exploring my work!</strong> </p>                  
                  <div className = "pc-icons">
                    <img src = "/Photos/pixel-mongo.png"/>
                    <img src = "/Photos/pixel-python.png"/>
                    <img src = "/Photos/pixel-node.png"/>
                    <img src = "/Photos/pixel-react.png"/>
                    <img src = "/Photos/FASTAPI.png"/>
                    <img src = "/Photos/pixel-aws.png"/>
                  </div>
                </div>
              }
              onClose={() => setshowPC(false)}
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
