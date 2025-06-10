import React from 'react';

const StyleGuide = () => {
  return (
    <div className="p-8 bg-cyber-background text-white space-y-6 font-body min-h-screen">
      <h1 className="text-4xl font-display text-cyber-blue">Display Font: Fredoka One</h1>
      <p className="text-lg">Body Font: Poppins</p>

      <div className="flex gap-4 flex-wrap">
        {[
          ['background', 'bg-cyber-background'],
          ['blue', 'bg-cyber-blue'],
          ['softBlue', 'bg-cyber-softBlue'],
          ['pink', 'bg-cyber-pink'],
          ['green', 'bg-cyber-green'],
          ['orange', 'bg-cyber-orange'],
          ['dark', 'bg-cyber-dark'],
          ['bubble', 'bg-cyber-bubble'],
        ].map(([name, className]) => (
          <div key={name} className={`${className} w-32 h-20 rounded-md shadow-md flex items-center justify-center`}>
            <span className="text-xs text-black font-bold">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleGuide;
