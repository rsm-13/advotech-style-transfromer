import React from 'react';

export default function Header({ currentTab, onTabChange }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="app-title">Advocate Style Transformer</h1>
          <p className="app-tagline">AI-powered literary typography</p>
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
        </nav>
      </div>
    </header>
  );
}
