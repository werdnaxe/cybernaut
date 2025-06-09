import React, { useState } from 'react';
import Quiz from '../components/Quiz';
import charlottePrototype from '../assets/CharlottePrototype.png'; // Adjust the path as necessary
import andrewPrototype from '../assets/AndrewPrototype.png'; // Adjust the path as necessary
import danielPrototype from '../assets/DanielPrototype.png'; // Adjust the path as necessary
import linneaPrototype from '../assets/LinneaPrototype.png'; // Adjust the path as necessary

const boxData = [
  { header: "What is the problem?", content: "The problem is the lack of media literacy with children and young adults in regard to how their data is manipulated and used on social media platforms, including how other users of said platforms can display devious behavior, and how the algorithms work for each user." },

  { header: "What are we trying to solve?", content: "With our project, we aim to educate children and young adults on how their data is being used, how the algorithms on their social media platforms work, and how to avoid bad actors who may have malicious intentions on those apps." },

  { header: "Which SDG goals are we addressing?", content: "Among the 17 Sustainable Development Goals (SDGs), our project achieves Quality Education (4) and Peace, Justice, and Strong Institutions (16)." },

  { header: "Why is this important? Is there a global impact?", content: "This problem is important because of how data distribution affects youth in our society. Distribution of minors’ data to anywhere across the internet leaves them susceptible to being manipulated by other nefarious users, advertisements, and inappropriate media. While there isn’t necessarily a global impact in this problem, the mental health of the youths who use scrolling apps can be at risk. For example, studies have shown the shocking percentages of how many more children end up with mental health problems because of how much they use social media, and how content is shown to them.  " },

  { header: "Who are our target users? Why should they care?", content: "The target users of this project are youths/adolescents. If the users of our websites care about being more media-literate on their social media apps, this project applies to them. However, it is unarguably difficult to get them to care if it isn’t forced, as accepting how media is fed to us is ‘common place’ and not challenged frequently enough (e.g., apps giving you a several hundred-long page document on terms of agreement and accepting it without understanding what it does). " },

  { header: "How many people benefit from our solution?", content: "While we have no measurable amount of people as to who our project would impact, our assumption is that it would impact any youth/adolescent who uses social media habitually." },

  { header: "Who are our reputable sources? (Example: CDC, UN, WHO)", content: (<span>Reputable sources like the CDC (Centers for Disease Control) and HAI (Stanford University Human-Centered Artificial Intelligence) groups have made similar claims–that social media negatively affects the mental health of their users. <br /> Provided are the articles and their links:&nbsp;<a href="https://hai.stanford.edu/news/psychiatrists-perspective-social-media-algorithms-and-mental-health" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">A Psychiatrist’s Perspective on Social Media Algorithms and Mental Health</a>&nbsp; and <a href="https://www.cdc.gov/mmwr/volumes/73/su/su7304a3.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Frequent Social Media Use and Experiences with Bullying Victimization, Persistent Feelings of Sadness or Hopelessness, and Suicide Risk Among High School Students — Youth Risk Behavior Survey, United States, 2023.</a><br />The CDC’s paper discusses the statistics analyzed from the amount of youth who are using social media. Stanford’s articles discusses the harmful effects and addictive behaviors of social media. While neither of these articles necessarily acknowledge that the harm is a direct effect of the algorithms as our project claims; they acknowledge the issue at large, being the impact that social media has over its users, especially in adolescents.</span>) },

  { header: "What is our solution?", content: "Our solution to educate the youth on how their social media apps can be harmful and manipulative was to create a website–What Is My Social Media Doing To Me?–a test module based interactive story that users can follow along with to learn about how their data is distributed, how bad actors will control situations, and how the algorithms on their social media work." },

  { header: "How is our solution different from others?", content: "Our solution is different to others because we take a step-by-step learning approach that teaches through a story. We have a mascot, Cybernaut, who represents any common user. Through the storytelling we’ve created, we show Cybernaut going through situations someone might find themselves in. Having your data saved and manipulated by others, impersonation, or how small-scale celebrities can be deceitful." },

  { header: "What technology did we use?", content: "For our project we used React to create our website, utilizing .jsx files and Tailwind (an in-line editor similar to CSS). During development, we ran the websites from our respective terminals to test as we programmed. We chose React so we could see active changes as we worked on the project." },

  { header: "Prototypes", content: "Our project went through several prototypes, which all shared the same idea - simple, colorful, and using a mascot for friendly engagement. Each developer agreed on the importance of a quiz module, wanting our website to be based around the learning process of media literacy and social media functionality. Each developer produced their own versions of the inital prototype, and we ended up 4 different prototypes, shown below:" },
];

const About = () => {
  const [result, setResult] = useState(null);

  const handleAnswer = (answerResult) => {
    setResult(answerResult);
  };

  return (
    <div className="relative text-center bg-[#275481] min-h-screen">
      {/* Quiz component */}
      {/* <Quiz
        options={['Cyberbullying', 'Privacy Settings', 'Algorithms', 'Digital Footprint']}
        onAnswer={handleAnswer}
      /> */}

      {/* Display result */}
      {/* {result !== null && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 px-6 py-4 rounded-xl shadow-lg text-2xl font-semibold text-blue-800">
          {typeof result === 'boolean'
            ? result
              ? 'Correct!'
              : 'Oops! Try again.'
            : `You selected: ${result}`}
        </div>
      )} */}

      <div className="bg-[#275481] min-h-screen text-center p-6 flex flex-col items-center">
        <h1 className="font-zing text-4xl font-bold text-black mb-10">About our project</h1>
        <div className="flex flex-col items-center space-y-10 w-full">
          {boxData.map((box, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg w-full max-w-3xl shadow"
            >
              <h2 className="text-2xl font-bold text-[#275481] mb-2">{box.header}</h2>
              <p className="text-black text-lg">
                {box.content}
              </p>
              {box.header === "Prototypes" && (
                <div>
                  <img
                    src={charlottePrototype}
                    alt="Prototype example"
                    className="mt-4 mx-auto rounded-lg shadow-lg max-h-80"
                  />
                  <img
                    src={andrewPrototype}
                    alt="Prototype example"
                    className="mt-4 mx-auto rounded-lg shadow-lg max-h-80"
                  />
                  <img
                    src={danielPrototype}
                    alt="Prototype example"
                    className="mt-4 mx-auto rounded-lg shadow-lg max-h-80"
                  />
                  <img
                    src={linneaPrototype}
                    alt="Prototype example"
                    className="mt-4 mx-auto rounded-lg shadow-lg max-h-80"
                  />
                  <p className="mt-6 text-black text-lg">
                    From these, we developed the final prototype - what you see now on the website!
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;