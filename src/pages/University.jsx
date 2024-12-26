import { useState } from "react";
import { UniversityPopup } from "../components/universityPopups/UniversityPopup";
import { DetailsPopup } from "../components/detailsPopup/DetailsPopup";
import { DeleteUniversity } from "../components/DeleteUniversity";

const filterData = [
  {
    name: "Consult",
    img: "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
    icon: "https://cdn-icons-png.flaticon.com/128/1763/1763477.png",
    modules: [
      {
        name: "consult first modules 1",
        image:
          "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
        chapter: [
          {
            title: "Chapter 1",
            summary: "Desc 1",
            readingTime: "34 min",
            image:
              "https://image.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
            pdf: "example.pdf",
          },
          {
            title: "Chapter 2",
            summary: "Desc 2",
            readingTime: "40 min",
            image:
              "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
            pdf: "example.pdf",
          },
        ],
      },
      {
        name: "consult second modules 1",
        image:
          "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
        chapter: [
          {
            title: "Chapter 1",
            summary: "Desc 1",
            readingTime: "20 min",
            image:
              "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
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
        name: "training first modules 1",
        image:
          "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
        chapter: [
          {
            title: "Chapter 1",
            summary: "Desc 1",
            readingTime: "15 min",
            image:
              "https://image.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
            pdf: "example.pdf",
          },
          {
            title: "Chapter 2",
            summary: "latests chapter",
            readingTime: "150 min",
            image:
              "https://img.freepik.com/free-vector/beautiful-green-landscape-background_1048-2991.jpg?uid=R118499020&ga=GA1.1.772838853.1731927176&semt=ais_hybrid",
            pdf: "example.pdf",
          },
        ],
      },
    ],
  },
];

export const University = () => {
  const [universities, setUniversities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteUniversityHandle, setDeleteUniversityHandle] = useState(false);
  const [deleteUniversityID, setDeleteUniversityID] = useState(null);

  // const fetchUniversities = async () => {
  //   try {
  //     const response = await fetch("/api/universities");
  //     const data = await response.json();
  //     setUniversities(data);
  //   } catch (error) {
  //     console.error("Error fetching universities:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUniversities();
  // }, []);

  const handleUniversityClick = (university) => {
    setSelectedUniversity(university);
    setIsOpenPopup(true);
  };

  const handleAddUniversity = () => {
    setIsEditMode(false);
    setSelectedUniversity(null);
    setIsOpen(true);
  };

  const handleEditClick = (e, university) => {
    e.stopPropagation();
    setSelectedUniversity(university);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const handleDeleteClick = (e, universityId) => {
    e.stopPropagation();
    setDeleteUniversityID(universityId);
    setDeleteUniversityHandle(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">
            Universities
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the universities including their name, modules, and
            chapters.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={handleAddUniversity}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add University
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {["University Name", "Modules", "Chapters", "Action"].map(
                    (item, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        {item}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {universities.map((university) => {
                  const totalChapters = university.modules.reduce(
                    (acc, module) => acc + module.chapters.length,
                    0
                  );
                  return (
                    <tr
                      onClick={() => handleUniversityClick(university)}
                      className="cursor-pointer"
                      key={university._id}
                    >
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="size-8 shrink-0">
                            <img
                              alt=""
                              src={university.img}
                              className="size-8"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {university.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-0 py-5 text-sm text-gray-500">
                        <div className="mt-1 text-gray-500">
                          {university.modules.length}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-0 py-5 text-sm text-gray-500">
                        <div className="mt-1 text-gray-500">
                          {totalChapters}
                        </div>
                      </td>
                      <td
                        onClick={(e) => e.stopPropagation()}
                        className="relative whitespace-nowrap space-x-3 py-5 pr-4 text-sm font-medium sm:pr-0"
                      >
                        <button
                          onClick={(e) => handleEditClick(e, university)}
                          className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(e, university._id)}
                          className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isOpen && (
        <UniversityPopup
          setIsOpen={setIsOpen}
          isEditMode={isEditMode}
          universityData={selectedUniversity}
          filterData={filterData}
        />
      )}
      {isOpenPopup && (
        <DetailsPopup
          setIsOpenPopup={setIsOpenPopup}
          university={selectedUniversity}
        />
      )}
      {deleteUniversityHandle && (
        <DeleteUniversity
          deleteUniversityID={deleteUniversityID}
          setDeleteUniversityHandle={setDeleteUniversityHandle}
        />
      )}
    </div>
  );
};
