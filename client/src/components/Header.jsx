import React from 'react';
import advocateLogo from '../utils/advocatelogo.png';
import advocateIcon from '../utils/advocateicon.jpg';

export default function Header({ currentTab, onTabChange }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <div className="advocate-brand">
            <img src={advocateIcon} alt="The Harvard Advocate icon" className="advocate-icon-image" />
            <img src={advocateLogo} alt="The Harvard Advocate" className="advocate-logo-image" />
          </div>
          <div className="header-copy">
            <h1 className="app-title">Advocate Style Transformer</h1>
            <p className="app-tagline">AI-powered literary typography</p>
          </div>
        </div>
        
        <nav className="tab-nav">
          <button
            className={`tab-button ${currentTab === 'editor' ? 'active' : ''}`}
            onClick={() => onTabChange('editor')}
          >
            Editor
          </button>
          <button
            className={`tab-button ${currentTab === 'instructions' ? 'active' : ''}`}
            onClick={() => onTabChange('instructions')}
          >
            Instructions
          </button>
          <button
            className={`tab-button ${currentTab === 'preview' ? 'active' : ''}`}
            onClick={() => onTabChange('preview')}
          >
            Preview
          </button>
        </nav>
      </div>
    </header>
  );
}
