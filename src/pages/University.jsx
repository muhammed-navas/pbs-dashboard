import React, { useEffect, useState } from "react";
import { DetailsPopup } from "../components/detailsPopup/DetailsPopup";
import { DeleteUniversity } from "../components/DeleteUniversity";
import { UniversityPopup } from "../components/universityPopups/UniversityPopup";
import axios from "axios";
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
const BACKEND_URL = "https://pbs-production.up.railway.app/";

export const University = () => {
  const [verticals, setVerticals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedVertical, setSelectedVertical] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteVerticalHandle, setDeleteVerticalHandle] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/admin/get-university-hierarchy`,
      );
      console.log(response.data)
      // setVerticals(response.data);
      setVerticals(filterData);
    } catch (error) {
      console.error("Error fetching verticals:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerticalClick = (vertical) => {
    setSelectedVertical(vertical);
    setIsOpenPopup(true);
  };

  const handleAddVertical = () => {
    setIsEditMode(false);
    setSelectedVertical(null);
    setIsOpen(true);
  };

  const handleEditClick = (e, vertical) => {
    e.stopPropagation();
    setSelectedVertical(vertical);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const handleDeleteClick = (e, verticalId) => {
    e.stopPropagation();
    setDeleteID(verticalId);
    setDeleteVerticalHandle(true);
  };

  const handleVerticalUpdate = async (updatedVertical) => {
    for(let [key,value] of updatedVertical.entries()){

      console.log(`${key}:`,value,'&&&&&&&&&&&&&');
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/admin/add-university-hierarchy`,
        updatedVertical,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      if (response.status === 200) {
        fetchData();
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error.message)
      console.error("Error updating vertical:", error);
    }
  };

  const handleDeleteVertical = async (verticalId) => {
    try {
      await axios.delete(`${BACKEND_URL}/admin/delete-vertical/${verticalId}`);
      fetchData();
      setDeleteVerticalHandle(false);
    } catch (error) {
      console.error("Error deleting vertical:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Vertical</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the Verticals including their name, modules, and
            chapters.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={handleAddVertical}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Vertical
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {["Vertical Name", "Modules", "Chapters", "Action"].map(
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
                {verticals?.map((vertical,i) => {
                  const totalChapters = vertical.modules.reduce(
                    (acc, module) => {
                      return acc + (module.chapters?.length || 0);
                    },
                    0
                  );
                  return (
                    <tr
                      onClick={() => handleVerticalClick(vertical)}
                      className="cursor-pointer"
                      key={i}
                    >
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0">
                            <img
                              alt=""
                              src={vertical.img}
                              className="h-8 w-8 rounded-full"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {vertical.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {vertical.modules.length}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {totalChapters}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={(e) => handleEditClick(e, vertical)}
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(e, vertical._id)}
                          className="text-red-600 hover:text-red-900"
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
          verticalData={selectedVertical}
          onVerticalUpdate={handleVerticalUpdate}
        />
      )}
      {isOpenPopup && (
        <DetailsPopup
          setIsOpenPopup={setIsOpenPopup}
          vertical={selectedVertical}
          setDeleteVerticalHandle={setDeleteVerticalHandle}
          setDeleteID={setDeleteID}
          setIsOpen={setIsOpen}
          setSelectedVertical={setSelectedVertical}
        />
      )}
      {deleteVerticalHandle && (
        <DeleteUniversity
          deleteID={deleteID}
          deleteVerticalHandle={deleteVerticalHandle}
          setDeleteVerticalHandle={setDeleteVerticalHandle}
          onDelete={handleDeleteVertical}
        />
      )}
    </div>
  );
};
