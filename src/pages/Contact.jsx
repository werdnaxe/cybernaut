import React from 'react'
import Narrator from '../components/Narrator';
import cybernautCharacter from '../assets/standing-cybernaut.png';

const Contact = () => {
  return (
      <div>
        <Narrator
          text="Hello, I'm Cybernaut! Want to contact us?"
          image={cybernautCharacter}
        />
      </div>
    );
}

export default Contact