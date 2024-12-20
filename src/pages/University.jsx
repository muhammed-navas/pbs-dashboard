import { useState } from "react";
import { UniversityPopup } from "../components/universityPopups/UniversityPopup";

const people = [
  {
    universityName: "PBS Consult",
    Modules: "6",
    Chapters: "12",
    image:
      "https://www.pbsprofile.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTech%20.e843ef8a.png&w=256&q=75",
  },
  {
    universityName: "PBS Training",
    Modules: "8",
    Chapters: "9",
    image:
      "https://www.pbsprofile.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstart%20up%202.2e5c63f3.png&w=256&q=75",
  },
  {
    universityName: "PBS Finance",
    Modules: "8",
    Chapters: "9",
    image:
      "https://img.freepik.com/free-vector/realistic-silver-stars-background_23-2149947731.jpg?uid=R179782123&ga=GA1.1.1661294206.1732189762&semt=ais_tags_boosted",
  },
];

export const University = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {["University Name", "Modules ", "Chapters", "Action"].map(
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
                {people.map((person) => (
                  <tr key={person.email}>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="size-8 shrink-0">
                          <img alt="" src={person.image} className="size-8 " />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {person.universityName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-0 py-5 text-sm text-gray-500">
                      {/* <div className="text-gray-900">{person.Modules}</div> */}
                      <div className="mt-1 text-gray-500">{person.Modules}</div>
                    </td>
                    <td className="whitespace-nowrap px-0 py-5 text-sm text-gray-500">
                      <div className="mt-1 text-gray-500">
                        {person.Chapters}
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap space-x-3 py-5  pr-4  text-sm font-medium sm:pr-0">
                      <button className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Edit
                      </button>
                      <button className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isOpen && <UniversityPopup setIsOpen={setIsOpen} />}
          </div>
        </div>
      </div>
    </div>
  );
};
