import React from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  BellIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { userNavigation } from '../constance/Dashboard';

export const DashboardHeader = () => {
  return (
    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <form action="#" method="GET" className="grid flex-1 grid-cols-1">
        <input
          name="search"
          type="search"
          placeholder="Search"
          aria-label="Search"
          className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
        />
        <MagnifyingGlassIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
        />
      </form>
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="size-6" />
        </button>

        {/* Separator */}
        <div
          aria-hidden="true"
          className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
        />

        {/* Profile dropdown */}
        <Menu as="div" className="relative">
          <MenuButton className="-m-1.5 flex items-center p-1.5">
            <span className="sr-only">Open user menu</span>
            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
              className="size-8 rounded-full bg-gray-50"
            />
            <span className="hidden lg:flex lg:items-center">
              <span
                aria-hidden="true"
                className="ml-4 text-sm/6 font-semibold text-gray-900"
              >
                Tom Cook
              </span>
              <ChevronDownIcon
                aria-hidden="true"
                className="ml-2 size-5 text-gray-400"
              />
            </span>
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                <a
                  href={item.href}
                  className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                >
                  {item.name}
                </a>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}