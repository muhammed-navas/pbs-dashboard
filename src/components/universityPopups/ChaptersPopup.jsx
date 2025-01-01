import React, { useState, useEffect } from "react";

export const ChaptersPopup = ({
  moduleId,
  isEditMode,
  chapter,
  modules,
  setModules,
}) => {
  const [chapterForm, setChapterForm] = useState({ ...chapter });
  const [errors, setErrors] = useState({});
  console.log(moduleId, "moduleId%%%%%%%%%");

  useEffect(() => {
    setChapterForm({
      title: chapter.title || "",
      image: chapter.image || null,
      readingTime: chapter.readingTime || "",
      summary: chapter.summary || "",
      pdf: chapter.pdf || null,
    });
  }, [chapter]);

  const handleChapterChange = (field, value) => {
    setChapterForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

  setModules((prevModules) =>
    prevModules.map((module) => {
      if (module.id === moduleId) {
        // Changed from _id to id
        const updatedChapters = module.chapters.map((ch) => {
          if (ch._id === chapter._id) {
            return {
              ...ch,
              [field]: value,
            };
          }
          return ch;
        });

        return {
          ...module,
          chapters: updatedChapters,
        };
      }
      return module;
    })
  );



  };

  const handleRemoveChapter = () => {
    if (window.confirm("Are you sure you want to remove this chapter?")) {
      setModules(
        modules.map((module) => {
          if (module._id === moduleId) {
            return {
              ...module,
              chapters: module.chapters.filter((ch) => ch._id !== chapter._id),
            };
          }
          return module;
        })
      );
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [field]: "File size must be less than 5MB",
      }));
      return;
    }

    if (field === "image" && !file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Please upload a valid image file",
      }));
      return;
    }

    if (field === "pdf" && file.type !== "application/pdf") {
      setErrors((prev) => ({
        ...prev,
        [field]: "Please upload a PDF file",
      }));
      return;
    }

    handleChapterChange(field, file);
  };

  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h4>Chapter {chapter._id}</h4>
        {!isEditMode && (
          <button onClick={handleRemoveChapter} className="text-gray-500">
            ×
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={chapterForm.title}
            name="title"
            onChange={(e) => handleChapterChange("title", e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter chapter title"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "image")}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.image && <p className="text-red-500">{errors.image}</p>}
          {chapterForm.image && (
            <img
              src={
                typeof chapterForm.image === "string"
                  ? chapterForm.image
                  : URL.createObjectURL(chapterForm.image)
              }
              alt="Chapter preview"
              className="mt-2 h-10 w-10"
            />
          )}
        </div>

        <div>
          <label>PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, "pdf")}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.pdf && <p className="text-red-500">{errors.pdf}</p>}
          {chapterForm.pdf && (
            <p className="text-sm">
              {typeof chapterForm.pdf === "string"
                ? chapterForm.pdf
                : chapterForm.pdf.name}
            </p>
          )}
        </div>

        <div>
          <label>Reading Time (minutes)</label>
          <input
            type="text"
            value={chapterForm.readingTime}
            onChange={(e) => handleChapterChange("readingTime", e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter reading time"
          />
          {errors.readingTime && (
            <p className="text-red-500">{errors.readingTime}</p>
          )}
        </div>

        <div className="col-span-2">
          <label>Summary</label>
          <textarea
            value={chapterForm.summary}
            onChange={(e) => handleChapterChange("summary", e.target.value)}
            className="w-full px-3 py-2 border rounded resize-none h-24"
            placeholder="Enter chapter summary"
          />
          {errors.summary && <p className="text-red-500">{errors.summary}</p>}
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
          Please fix the errors above before proceeding.
        </div>
      )}
    </div>
  );
};
