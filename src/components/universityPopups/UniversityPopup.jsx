import React, { useEffect, useState } from "react";
import { ModulesPopup } from "./ModulesPopup";

export const UniversityPopup = ({
  setIsOpen,
  isEditMode,
  verticalData,
  onVerticalUpdate,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    icon: null,
    imagePreview: null,
    iconPreview: null,
    modules: [],
  });
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isEditMode && verticalData) {
      setFormData({
        name: verticalData.name,
        image: null,
        icon: null,
        imagePreview: verticalData.img,
        iconPreview: verticalData.icon,
        modules: verticalData.modules || [],
      });
    }
  }, [isEditMode, verticalData]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const field = e.target.id;
      const previewField = `${field}Preview`;

      setFormData((prev) => ({
        ...prev,
        [field]: file,
        [previewField]: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (formData.image) formDataToSend.append("image", formData.image);
    if (formData.icon) formDataToSend.append("icon", formData.icon);
    formDataToSend.append("modules", JSON.stringify(formData.modules));

    onVerticalUpdate(formDataToSend);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex z-[99999] items-center justify-center">
      <div className="bg-white rounded-lg p-10 w-3/4 h-[35rem] relative">
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

        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Vertical" : "Add Vertical"}
        </h2>

        {step === 1 ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Vertical Name
              </label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                type="text"
                placeholder="Enter vertical name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Icon
              </label>
              <input
                type="file"
                id="icon"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {(formData.imagePreview || formData.iconPreview) && (
              <div className="mb-4 flex space-x-4">
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="Image Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                {formData.iconPreview && (
                  <img
                    src={formData.iconPreview}
                    alt="Icon Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
            )}
          </>
        ) : (
          <ModulesPopup
            setStep={setStep}
            step={step}
            modules={formData.modules}
            setModulesData={setFormData}
            isEditMode={isEditMode}
          />
        )}

        <div className="absolute bottom-4 right-4 flex gap-2">
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="px-3 py-1 text-sm text-blue-500 hover:text-blue-700"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 1 ? () => setStep(2) : handleSubmit}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
          >
            {step === 1 ? "Next" : isEditMode ? "Update" : "Submit"}
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
  );
};
