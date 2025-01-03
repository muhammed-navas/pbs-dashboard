import React, { useEffect, useState } from "react";
import { ChaptersPopup } from "./ChaptersPopup";

export const ModulesPopup = ({
  setStep,
  setModulesData,
  modules: initialModules,
  isEditMode,
}) => {
  const [modules, setModules] = useState(initialModules || []);
  const [changes, setChanges] = useState({});
  const maxModules = 5;
  const maxChapters = 2;

  useEffect(() => {
    setModulesData((prev) => ({ ...prev, modules }));
  }, [modules, setModulesData]);

  const handleAddModule = () => {
      if (modules.length < maxModules) {
        const newModule = {
          id: Date.now(),
          name: "",
          image: null,
          chapters: [], // Initialize empty chapters array
        };
        setModules([...modules, newModule]);
      }
      
  };

  const handleRemoveModule = (moduleId) => {
    setModules(modules.filter((module) => module.id !== moduleId));
    setChanges((prev) => {
      const newChanges = { ...prev };
      delete newChanges[moduleId];
      return newChanges;
    });
  };

  const handleModuleChange = (moduleId, field, value) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId ? { ...module, [field]: value } : module
      )
    );
    setChanges((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [field]: true,
      },
    }));
  };

  const handleAddChapter = (moduleId) => {
   setModules(
     modules.map((module) => {
       if (module.id === moduleId && module.chapters.length < maxChapters) {
         const newChapter = {
           _id: Date.now(), // Changed from id to _id to match the expected format
           title: "",
           image: null,
           pdf: null,
           readingTime: "",
           summary: "",
         };
         return {
           ...module,
           chapters: [...(module.chapters || []), newChapter],
         };
       }
       return module;
     })
   );

    setChanges((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        chapters: {
          ...prev[moduleId]?.chapters,
          [Date.now()]: { isNew: true },
        },
      },
    }));
  };

  const handleChapterChange = (moduleId, chapterId, field, value) => {
    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            chapters: module.chapters.map((chapter) =>
              chapter.id === chapterId
                ? { ...chapter, [field]: value }
                : chapter
            ),
          };
        }
        return module;
      })
    );
    setChanges((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        chapters: {
          ...prev[moduleId]?.chapters,
          [chapterId]: {
            ...prev[moduleId]?.chapters?.[chapterId],
            [field]: true,
          },
        },
      },
    }));
  };
  console.log(modules, "modules*****");

  return (
    <div className="rounded-lg p-2 w-full h-[25rem] overflow-y-scroll">
      <div className="space-y-4">
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleAddModule}
            disabled={modules.length >= maxModules}
            className="border border-gray-300 px-4 py-1 text-sm rounded-lg shadow hover:bg-gray-200 duration-500 disabled:opacity-50"
          >
            + Add New Module
          </button>
        </div>

        {modules.map((module) => (
          <div key={module.id} className="p-4 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Module Name
                </label>
                <input
                  type="text"
                  value={module.name}
                  onChange={(e) =>
                    handleModuleChange(module.id, "moduleName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter module name"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Module Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleModuleChange(module.id, "moduleImage", e.target.files[0])
                  }
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
                />
              </div>
              {module.image && (
                <img
                  src={
                    typeof module.image === "string"
                      ? module.image
                      : URL.createObjectURL(module.image)
                  }
                  alt="Icon Preview"
                  className="w-10 h-10 object-cover rounded"
                />
              )}
              {modules.length > 1 && !isEditMode && (
                <button
                  onClick={() => handleRemoveModule(module.id)}
                  className="text-gray-500 hover:text-gray-700"
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

            <div className="mt-4">
              <button
                onClick={() => handleAddChapter(module.id)}
                disabled={module.chapters.length >= maxChapters}
                className="text-sm text-blue-500 hover:text-blue-700 disabled:opacity-50"
              >
                + Add Chapter (Max {maxChapters})
              </button>

              {module.chapters.map((chapter) => (
                <ChaptersPopup
                  key={chapter.id}
                  moduleId={module.id}
                  chapter={chapter}
                  isEditMode={isEditMode}
                  setModules={setModules}
                  onChapterChange={(field, value) =>
                    handleChapterChange(module.id, chapter.id, field, value)
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
