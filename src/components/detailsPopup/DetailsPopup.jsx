import { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const filterData = [
  {
    name: "Consult",
    img: "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
    icon: "https://cdn-icons-png.flaticon.com/128/1763/1763477.png",
    modules: [
      {
        moduleName: "Consult With Modules",
        img: "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
        chapter: [
          {
            title: "Chapter 1",
            description: "Desc 1",
            time: "34 min",
            img: "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
            pdf: "example.pdf",
          },
          {
            title: "Chapter 2",
            description: "Desc 2",
            time: "40 min",
            img: "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
            pdf: "example.pdf",
          },
        ],
      },
      {
        moduleName: "Consult With Modules 2",
        img: "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
        chapter: [
          {
            title: "Chapter 1",
            description: "Desc 1",
            time: "20 min",
            img: "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
            pdf: "example.pdf",
          },
        ],
      },
    ],
  },
  {
    name: "Training",
    img: "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
    icon: "https://cdn-icons-png.flaticon.com/128/1763/1763477.png",
    modules: [
      {
        moduleName: "Training Module",
        img: "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
        chapter: [
          {
            title: "Chapter 1",
            description: "Desc 1",
            time: "15 min",
            img: "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
            pdf: "example.pdf",
          },
          {
            title: "Chapter 2",
            description: "latests chapter",
            time: "150 min",
            img: "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
            pdf: "example.pdf",
          },
        ],
      },
    ],
  },
];

export const DetailsPopup = ({ setIsOpenPopup }) => {
  const [selectedName, setSelectedName] = useState("Select University");
  const [selectedModule, setSelectedModule] = useState("Select Module");
  const [selectedChapter, setSelectedChapter] = useState("Select Chapter");
  const [selectedNameIndex, setSelectedNameIndex] = useState(
    filterData.length - 1
  );
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [openItem, setOpenItem] = useState(null);

  useEffect(() => {
    const latestUniversity = filterData[filterData.length - 1];
    const latestModule =
      latestUniversity.modules[latestUniversity.modules.length - 1];
    const latestChapter = latestModule.chapter[latestModule.chapter.length - 1];

    setSelectedName(
      `${latestUniversity.name} (${latestUniversity.modules.length} Modules)`
    );
    setSelectedModule(
      `Module ${latestUniversity.modules.length} (${latestModule.chapter.length} Chapters)`
    );
    setSelectedChapter(latestChapter.title);
    setSelectedNameIndex(filterData.length - 1);
    setSelectedModuleIndex(latestUniversity.modules.length - 1);
    setSelectedChapterIndex(latestModule.chapter.length - 1);
  }, []);

  const handleSelect = (type, idx, option) => {
    switch (type) {
      case "name":
        setSelectedName(
          `${option} (${filterData[idx].modules.length} Modules)`
        );
        setSelectedNameIndex(idx);
        setSelectedModule("Select Module");
        setSelectedChapter("Select Chapter");
        setSelectedModuleIndex(null);
        setSelectedChapterIndex(null);
        break;
      case "module":
        const chapterCount =
          filterData[selectedNameIndex].modules[idx].chapter.length;
        setSelectedModule(`Module ${idx + 1} (${chapterCount} Chapters)`);
        setSelectedModuleIndex(idx);
        setSelectedChapter("Select Chapter");
        setSelectedChapterIndex(null);
        break;
      case "chapter":
        setSelectedChapter(option);
        setSelectedChapterIndex(idx);
        break;
      default:
        break;
    }
    setOpenItem(null);
  };

  const getModuleOptions = () => {
    if (selectedNameIndex === null) return [];
    return filterData[selectedNameIndex].modules.map((module, idx) => {
      const chapterCount = module.chapter.length;
      return `Module ${idx + 1} (${chapterCount} Chapters)`;
    });
  };

  const getChapterOptions = () => {
    if (selectedNameIndex === null || selectedModuleIndex === null) return [];
    return filterData[selectedNameIndex].modules[
      selectedModuleIndex
    ].chapter.map((chapter) => chapter.title);
  };

  const selectedUniversity = filterData[selectedNameIndex];
  const selectedModuleData = selectedUniversity.modules[selectedModuleIndex];
  const selectedChapterData = selectedModuleData.chapter[selectedChapterIndex];

  return (
    <div className="bg-white absolute top-0 left-0 w-full z-[99] h-auto min-h-screen">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
          <button
            onClick={() => setIsOpenPopup(false)}
            className="text-4xl font-bold tracking-tight text-gray-900"
          >
            <IoMdArrowRoundBack className="w-6 h-6" />
          </button>
        </div>

        <section className="flex gap-5 py-3">
          <div className="w-64 space-y-4 border-r-2 border-gray-100 pr-4">
            {[
              {
                id: "name",
                title: selectedName,
                options: filterData.map((item) => item.name),
                count: null,
              },
              {
                id: "module",
                title: selectedModule,
                options: getModuleOptions(),
                count:
                  selectedNameIndex !== null
                    ? filterData[selectedNameIndex].modules.length
                    : 0,
              },
              {
                id: "chapter",
                title: selectedChapter,
                options: getChapterOptions(),
                count:
                  selectedNameIndex !== null && selectedModuleIndex !== null
                    ? filterData[selectedNameIndex].modules[selectedModuleIndex]
                        .chapter.length
                    : 0,
              },
            ].map((item) => (
              <div key={item.id} className="overflow-hidden">
                <button
                  onClick={() =>
                    setOpenItem(openItem === item.id ? null : item.id)
                  }
                  className="flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left text-gray-700 bg-gray-200 rounded-md hover:bg-gray-200"
                >
                  <span>{item.title}</span>
                  <div>
                    {item.count !== null && item.count > 0 && (
                      <span className="bg-blue-200 mr-3 text-xs text-black px-2 py-1 rounded-md">
                        {item.count}
                      </span>
                    )}
                    <span
                      className={`text-gray-500 transition-transform duration-200 ${
                        openItem === item.id ? "transform rotate-180" : ""
                      }`}
                    >
                      &#9650;
                    </span>
                  </div>
                </button>
                {openItem === item.id && (
                  <div className="px-4 pt-4 pb-2 text-sm text-gray-500 bg-white">
                    <ul className="space-y-2">
                      {item.options.map((option, idx) => (
                        <li
                          key={idx}
                          className="cursor-pointer hover:bg-gray-200 px-3 py-1 rounded-md hover:text-purple-700"
                          onClick={() => handleSelect(item.id, idx, option)}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="w-3/4 h-auto">
            <div className="">
              <>
                <div className="flex justify-between items-center">
                  <h3 className="pb-2 font-semibold">
                    {selectedUniversity.name}
                  </h3>
                  <button>Edit</button>
                </div>
                <table className="w-full border rounded-lg border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      {["Name", "Image", "Icon"].map((item, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="py-3 px-4 text-left text-sm font-semibold text-gray-900"
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900">
                        {selectedUniversity.name}
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-500">
                        <img
                          className="w-16 h-10 object-cover"
                          src={selectedUniversity.img}
                          alt={selectedUniversity.name}
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-500">
                        <img
                          className="w-10 h-10"
                          src={selectedUniversity.icon}
                          alt={`${selectedUniversity.name} icon`}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
              <>
                <h3 className="pt-2 font-semibold">Module</h3>
                <table className="w-full border mt-1 border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      {["Name", "Image"].map((item, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="py-3 px-4 text-left text-sm font-semibold text-gray-900"
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900">
                        {selectedModuleData.moduleName}
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-500">
                        <img
                          className="w-16 h-10 object-cover"
                          src={selectedModuleData.img}
                          alt={selectedModuleData.moduleName}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
              <>
                <h3 className="pt-2 font-semibold">Chapter</h3>
                <div className="border border-gray-300 p-2">
                  <table className="w-full mt-1">
                    <thead className="bg-gray-100">
                      <tr>
                        {["Name", "Reading Time", "Image", "PDF"].map(
                          (item, index) => (
                            <th
                              key={index}
                              scope="col"
                              className="py-3 px-4 text-left text-sm font-semibold text-gray-900"
                            >
                              {item}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900">
                          {selectedChapterData.title}
                        </td>
                        <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900">
                          {selectedChapterData.time}
                        </td>
                        <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-500">
                          <img
                            className="w-16 h-10 object-cover"
                            src={selectedChapterData.img}
                            alt={selectedChapterData.title}
                          />
                        </td>
                        <td className="whitespace-nowrap py-4 underline px-4 text-xs cursor-pointer font-medium text-blue-500">
                          View The PDF
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="border-t border-gray-300 pt-3">
                    {selectedChapterData.description}
                  </div>
                </div>
              </>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
