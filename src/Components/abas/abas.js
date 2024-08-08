import React, { useState } from 'react';

export function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        {React.Children.map(children, (child, index) => (
          <button
            className={`tab ${index === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
}

export function Tab({ children }) {
  return <div>{children}</div>;
}