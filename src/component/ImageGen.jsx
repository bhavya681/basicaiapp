/*Text To Image*/

import React, { useState } from 'react';
import axios from 'axios';

const ImageGen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState('');
  const [state, setState] = useState({ input: '' });
  const [generatedImages, setGeneratedImages] = useState([]);

  const onChangeHandler = (e) => {
    setState({...state, [e.target.name]: e.target.value });
  };

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev',
        { inputs: state.input },
        { headers: { 'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}` }, responseType: 'blob' }
      );

      const blob = response.data;
      const blobUrl = URL.createObjectURL(blob);
      setData(blobUrl);
      setGeneratedImages((prev) => [{ url: blobUrl, prompt: state.input }, ...prev].slice(0, 4));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 animate-gradient">
            AI Image Generator
          </h1>
          <p className="text-gray-400 text-lg">Transform your ideas into stunning visuals using AI</p>
        </div>

        {/* Input Section */}
        <form onSubmit={OnSubmitHandler} className="mb-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-gray-800 rounded-2xl px-4 py-3 shadow-xl">
              <input
                type="text"
                name="input"
                onChange={onChangeHandler}
                placeholder="Describe your imagination..."
                className="w-full px-4 py-5 bg-transparent border-0 focus:ring-0 text-lg placeholder-gray-500 text-white"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="ml-4 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    Create
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Main Generated Image */}
        {data && (
          <div className="mb-16 animate-fade-in-up">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-3xl shadow-2xl border border-gray-700">
              <div className="relative group">
                <img
                  src={data}
                  alt="Generated content"
                  className="w-full h-96 object-cover rounded-xl transform group-hover:scale-98 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent rounded-b-xl">
                  <p className="text-gray-300 text-sm font-mono">"{state.input}"</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Generations Grid */}
        {generatedImages.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-8 text-gray-300">Recent Creations</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {generatedImages.map((img, index) => (
                <div key={index} className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <img
                    src={img.url}
                    alt={`Generated ${index}`}
                    className="w-full h-40 object-cover rounded-xl border-2 border-gray-800 group-hover:border-transparent transition-all duration-300"
                  />
                  <div className="absolute inset-0 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent rounded-xl">
                    <p className="text-xs text-gray-300 px-2 pb-2 font-medium">{img.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGen;