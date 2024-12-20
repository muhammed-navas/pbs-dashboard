import React, { useState } from "react";
import { ModulesPopup } from "./ModulesPopup";
import { ChaptersPopup } from "./ChaptersPopup";

export const UniversityPopup = ({ setIsOpen }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isActive , setIsActive ] = useState(false);
  const [iconPreview, setIconPreview] = useState(null);
  const [step, setStep] = useState(1);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (e.target.id === "image") {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
      } else if (e.target.id === "icon") {
        setIcon(file);
        setIconPreview(URL.createObjectURL(file));
      }
    }
  };

const handleNext = () => {
  if (step < 3) {
    setStep(step + 1);
  } else {
    // Handle final step submission
    console.log("Submitting:", { name, image, icon });
    setIsOpen(false);
  }
};
const handleBack = () => {
  if (step > 1) {
    setStep(step - 1);
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex  z-[99999] items-center justify-center">
      <div className="bg-white rounded-lg p-10 w-1/2  relative">
        <button
          onClick={() => setIsOpen(false)}
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

        <h2 className="text-xl font-bold font-mono mb-4">Enter Details</h2>

        {step === 1 ? (
          <>
            <div>
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                University Card Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="name"
                    name="name"
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter university name"
                    className="block min-w-0 grow px-3 py-1.5 text-base text-gray-900 placeholder:text-xs placeholder:text-gray-300 focus:outline focus:outline-0 sm:text-sm/6"
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

            <div className="my-4">
              <label
                htmlFor="icon"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Icon
              </label>
              <input
                type="file"
                id="icon"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {(imagePreview || iconPreview) && (
              <div className="mb-4 flex space-x-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                {iconPreview && (
                  <img
                    src={iconPreview}
                    alt="Icon Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
            )}
          </>
        ) : step === 2 ? (
          <ModulesPopup setStep={setStep} step={step} setIsOpen={setIsOpen} />
        ) : (
          <ChaptersPopup setStep={setStep} step={step} setIsOpen={setIsOpen} />
        )}

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

        <button
          onClick={handleNext}
          className="absolute bottom-4 text-sm right-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
        >
          {step === 1 ? "Next" : "Submit"}
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
      {/* {isActive && <ModulesPopup setIsActive={setIsActive} />} */}
    </div>
  );
};
