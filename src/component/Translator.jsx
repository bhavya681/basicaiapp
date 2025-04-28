
/*Translate Stuff*/

import React, { useState } from 'react';

const languages = [
  { name: "English", code: "eng_Latn" },
  { name: "Russian", code: "rus_Cyrl" },
  { name: "Hindi", code: "hin_Deva" },
  { name: "Chinese (Simplified)", code: "zho_Hans" },
  { name: "Spanish", code: "spa_Latn" },
  { name: "French", code: "fra_Latn" },
  { name: "German", code: "deu_Latn" },
  { name: "Arabic", code: "arb_Arab" },
];

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('rus_Cyrl');
  const [targetLang, setTargetLang] = useState('eng_Latn');

  const HUGGINGFACE_TOKEN =import.meta.env.VITE_HUGGINGFACE__API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutputText('');

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/nllb-200-distilled-600M",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: inputText,
            parameters: {
src_lang: sourceLang,
tgt_lang: targetLang,
            },
          }),
        }
      );

      const result = await response.json();
      if (result && result[0]?.translation_text) {
        setOutputText(result[0].translation_text);
      } else {
        setOutputText("Translation failed or unavailable.");
      }
    } catch (error) {
      console.error("Translation error:", error);
      setOutputText("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">🌐 AI Language Translator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
<textarea
  className="w-full border rounded-xl p-3 resize-none"
  rows="4"
  placeholder="Enter text to translate..."
  value={inputText}
  onChange={(e) => setInputText(e.target.value)}
  required
/>

          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-600">From</label>
              <select
                className="w-full border p-2 rounded-xl"
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-600">To</label>
              <select
                className="w-full border p-2 rounded-xl"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition"
          >
            {loading ? "Translating..." : "Translate"}
          </button>
        </form>

        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">📝 Translation Output:</h2>
          <div className="p-3 bg-gray-100 rounded-xl min-h-[60px] whitespace-pre-line">
            {loading ? "Processing..." : outputText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;