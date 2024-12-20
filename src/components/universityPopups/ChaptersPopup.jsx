import React, { useState } from 'react'

export const ChaptersPopup = ({ setStep, setIsOpen, step }) => {
    const [chapterName, setChapterName] = useState("");
      const [moduleImage, setModuleImage] = useState(null);
      const [isCount, setIsCount] = useState(1);

       const handleImageChange = (e) => {
         if (e.target.files && e.target.files[0]) {
           const file = e.target.files[0];
           setModuleImage(file);
         }
       };

       const handleSubmit = () => {
         console.log("Submitting:", { chapterName, moduleImage });
         setStep(step + 1);
         setIsActive(true);
         setName("");
         setImage(null);
         setImagePreview(null);
         setIsActive(false);
       };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex  z-[99999] items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-1/2  pb-10  relative">
        <button
          onClick={() => {
            setStep(1), setIsOpen(false);
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {Array(isCount)
          .fill()
          .map((_, i) => (
            <div className="flex items-center gap-4 justify-center">
              <div key={i}>
                <label
                  htmlFor="search"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Chapters
                </label>
                <div className="">
                  <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="name"
                      name="search"
                      value={chapterName}
                      type="text"
                      onChange={(e) => setChapterName(e.target.value)}
                      placeholder="Enter your name"
                      className="block min-w-0 grow px-3 py-3 text-base text-gray-900 placeholder:text-xs placeholder:text-gray-3 00 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="my-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {isCount >= 2 && i !== 0 && (
                <button
                  onClick={() => setIsCount(isCount - 1)}
                  className="  text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
        <div className="flex justify-center mb-4">
          <div
            className={`w-3 h-3 rounded-full mx-1 ${
              step >= 1 ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`w-3 h-3 rounded-full mx-1 ${
              step >= 2 ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`w-3 h-3 rounded-full mx-1 ${
              step >= 3 ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => setIsCount(isCount + 1)}
              className=" px-2 py-0 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center text-xl"
            >
              +
            </button>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setStep(step - 1)}
              className=" text-sm  px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className=" text-sm  px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
