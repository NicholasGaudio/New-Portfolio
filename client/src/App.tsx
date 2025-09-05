import React, { useState, useEffect } from 'react';
import DraggablePopup from './DraggablePopup';
import DraggablePopupProject from './DraggablePopupProject';
import project from './types/projects'
import "./CSS/App.css";
import "./CSS/Taskbar.css";
import "./CSS/PopupGeneral.css";
import "./CSS/PopupAbout.css";
import "./CSS/PopupProject.css";
import "./CSS/PopupPC.css";

const App: React.FC = () => {
  const [time, setTime] = useState<string>(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [showAbout, setshowAbout] = useState(false)
  const [showPC, setshowPC] = useState(true)
  const [showProjects, setshowProjects] = useState(false)
  const [projects, setProjects] = useState<project[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('https://api.nicholasgaudio.com/projects/')
      .then(response => {
        if (!response.ok) {
          throw new Error("Response failed");
        }
        return response.json();
      })
      .then(data => {
        console.log("API Response:", data);
        if (data && Array.isArray(data.projects)) {
          setProjects(data.projects); 
        } else {
          console.error("Unexpected response format:", data);
        }
      })
  }, []);

  

  
  return (
    <div className="desktop">
      <div className = "desktop-icons">

          <div className = "icon" onClick={() => setshowPC(true)}> 
            <img src = "/Photos/pc.png"/>
            <span>My Computer</span>
          </div>

          <div className = "icon" onClick= {() => setshowAbout(true)}> 
            <img src = "/Photos/word-logo.png"/>
            <span>About Me</span>
          </div>

          <div className = "icon"> 
            <img src = "/Photos/folder.png" onClick={() => setshowProjects(true)}/>
            <span>My Projects</span>
          </div>

          <a href="https://docs.google.com/document/d/1dA1j5S4IIHOzXn5S8F0m8tM-KkMQxouRaleP8C0SgMw/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className = "icon"> 
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
      </div>

    {showAbout && (
      <DraggablePopup
        title="About Me: Nicholas Gaudio"
        content={
          <div>
            <div className = "headshot">
              <img src = "/Photos/pixel-nick.png"/>
            </div>
            <p> I'm a third-year Computer Science major at the University of Florida with a minor in Digital Arts and Sciences. </p>
            <p>I have a passion for combining my technical and creative interests to build innovative projects.
              This includes creating music software, full stack applications, and exploring game development.
              I also found a strong interest in embedded systems through my work at GE Appliances and working with microcontrollers.
              In my free time, I enjoy playing music, working out, and developing some personal projects. </p>
            <p><strong>Check them out in the projects folder and visit the repos by clicking on them!</strong></p>
            {/* <p><strong>WORK EXPERIENCE</strong></p>    */}
            <div className = "experience-icons">
                <img src = "/Photos/pixel-GE.png"/>
                <img src = "/Photos/pixel-UF.png"/>
                <img src = "/Photos/pixel-QE.png"/>
            </div>             
          </div>
        }
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
              <img src = "/Photos/pixel-aws2.png"/>
              <img src = "/Photos/pixel-PS.png"/>
            </div>
          </div>
        }
        onClose={() => setshowPC(false)}
      />
    )}

    {showProjects && (
      <DraggablePopupProject
        title="My Projects"
        content={
          <div>
            <div className="projects-content">
              {projects.map((project) => (
                <a key={project.id} className="project-item" href= {project.projectLink} target="_blank" rel="noopener noreferrer">
                  <div className='project-details'>
                    <div className="project-title">
                      <h2>
                        {project.name}: <span> {project.timeFrame}</span> 
                      </h2>
                    </div>
                    <div className="content-tools">
                      {project.projectTools.map((tool, index) => (
                      <img key={index} src={tool} alt={`Tool ${index}`} className="tool-image"/>
                      ))}
                    </div>
                    <div className="content-description">
                      <p>{project.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        }
        onClose={() => setshowProjects(false)}
      />
    )}

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
