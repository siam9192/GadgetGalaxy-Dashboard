import { IoSettingsOutline } from "react-icons/io5";
import { TRoute } from "../types/util.type";
import { PiImageFill } from "react-icons/pi";
import { LuBadgeHelp } from "react-icons/lu";
const generalRoutes: TRoute[] = [
  {
    title: "Setting",
    path: "/setting",
    icon: IoSettingsOutline,
  },
  {
    title: "Appearances",
    path: "/appearances",
    icon: PiImageFill,
  },
  {
    title: "Need Helps",
    path: "/helps",
    icon: LuBadgeHelp,
  },
];

export default generalRoutes;
