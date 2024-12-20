

import {
  FolderIcon,
  HomeIcon,
  UsersIcon,

} from "@heroicons/react/24/outline";

 export const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon },
    { name: "Team", href: "#", icon: UsersIcon },
    { name: "Projects", href: "#", icon: FolderIcon },
  ];
 export const teams = [
   {
     id: 1,
     name: "PBS University",
     href: "#",
     icon: "/icons/university.png",
   },
   // { id: 2, name: "Tailwind Labs", href: "#", icon: "/icons/university.png" },
 ];
 export const userNavigation = [
   { name: "Your profile", href: "#" },
   { name: "Sign out", href: "#" },
 ];