import React from 'react';
import './ContactModal.css';
import profileImage from '../assets/images/Rohit.jpg';

interface ContactModalProps {
  show: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&times;</button>
        <div className="contact-container">
          <div className="profile">
            <img src={profileImage} alt="Profile" className="profile-image" />
            <div className="profile-description">
              <h2>Rohit Kumar</h2>
              <p>Full-Stack Software Dev with expertise in C++, Python, JavaScript, and Cloud Computing. Passionate about building scalable web applications and exploring new technologies.</p>
            </div>
          </div>
          <h2>Contact Us</h2>
          <p>We would love to hear from you! Reach out to us through any of the following options:</p>
          <div className="contact-options">
            <a href="mailto:connect2rohitkmr@gmail.com" className="contact-option">Email Us</a>
            <a href="https://www.linkedin.com/in/itz-rohit" className="contact-option" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/git-with-Rohit" className="contact-option" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
