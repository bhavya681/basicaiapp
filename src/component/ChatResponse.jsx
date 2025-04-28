
/*Text To Text */

import React, { useState } from 'react';
import axios from 'axios';

const ChatResponse = () => {

  const [state, setState] = useState({ input: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const HUGGINGFACE_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_KEY; 
  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: state.input
        }),
      });

      const result = await response.json();
      console.log(result.generated_text);
      setData(result || "No output");
    } catch (error) {
      console.error("Error fetching from HF API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
          AI Chat Assistant
        </h1>

        <div className="bg-gray-800 rounded-xl p-4 shadow-xl mb-8">
          <form onSubmit={OnSubmitHandler} className="flex gap-4">
            <input
              type="text"
              name="input"
              value={state.input}
              onChange={onChangeHandler}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 bg-gray-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {data.map((d, index) => (
            <div 
              key={index}
              className="bg-gray-800 p-4 rounded-xl animate-fade-in"
            >
              <p className="text-gray-300 whitespace-pre-wrap">{d.generated_text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  
    </>
   );
 };

 export default ChatResponse;
