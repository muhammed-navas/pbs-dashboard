import React, { useState } from 'react'

export const ChaptersPopup = ({ moduleId, chapter, modules, setModules }) => {
  const handleChapterChange = (field, value) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            chapters: module.chapters.map((ch) =>
              ch.id === chapter.id ? { ...ch, [field]: value } : ch
            ),
          };
        }
        return module;
      })
    );
  };

  const handleRemoveChapter = () => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            chapters: module.chapters.filter((ch) => ch.id !== chapter.id),
          };
        }
        return module;
      })
    );
  };

  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-semibold">Chapter {chapter.id}</h4>
        <button
          onClick={handleRemoveChapter}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={chapter.title}
            onChange={(e) => handleChapterChange("title", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter chapter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChapterChange("image", e.target.files[0])}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleChapterChange("pdf", e.target.files[0])}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reading Time (minutes)
          </label>
          <input
            type="number"
            value={chapter.readingTime}
            onChange={(e) => handleChapterChange("readingTime", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter reading time"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Summary
          </label>
          <textarea
            value={chapter.summary}
            onChange={(e) => handleChapterChange("summary", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none h-24"
            placeholder="Enter chapter summary"
          />
        </div>
      </div>
    </div>
  );
};

