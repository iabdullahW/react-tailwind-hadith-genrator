import  { useState } from 'react';

const HadithGenerator = () => {
  const [hadith, setHadith] = useState('Click on the "New Hadith" button.');
  const [narrator, setNarrator] = useState('');
  const [speech, setSpeech] = useState(null);

  const fetchRandomHadith = async () => {
    try {
      setHadith('Loading Hadith...');
      const response = await fetch('https://random-hadith-generator.vercel.app/bukhari/');
      const data = await response.json();
      setHadith(data.data.hadith_english);
      setNarrator(data.data.header);
    } catch (error) {
      console.error('Error fetching Hadith:', error);
      setHadith('Failed to load Hadith');
    }
  };

  const speakHadith = () => {
    if (!speech) {
      const utterance = new SpeechSynthesisUtterance(hadith);
      utterance.onend = () => {
        setSpeech(null);
      };
      speechSynthesis.speak(utterance);
      setSpeech(utterance);
    }
  };

  const stopSpeaking = () => {
    if (speech) {
      speechSynthesis.cancel();
      setSpeech(null);
    }
  };

  return (
    <div className="container bg-gray-200 p-6 rounded-lg shadow-md">
      <header className="text-2xl font-bold text-center">Hadith of the day</header>
      <span className="narrator block text-center">{narrator}</span>
      <div className="content mt-4 flex flex-col items-center">
        <div className="textarea text-center">
          <p className="hadis text-lg">{hadith}</p>
        </div>
        <div className="buttons mt-4">
          <div className="feature flex justify-center items-center">
            <ul>
              <li className="sound mr-2" onClick={speakHadith}>
                <i className="fas fa-volume-high"></i>
              </li>
              <li className="stop" onClick={stopSpeaking}>
                <i className="fas fa-volume-off"></i>
              </li>
            </ul>
            <button className="newb py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-200" onClick={fetchRandomHadith}>
              New Hadith
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadithGenerator;
