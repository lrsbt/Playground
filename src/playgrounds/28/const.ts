import { ToastType } from "./types";

export const CONFIG = {
  DURATION: 15 * 1000
};

export const DATA: ToastType[] = [
  {
    id: 0,
    title: "Changes saved",
    type: "warning",
    message:
      "Are you sure you would like to remove this user? If the user is an active member of your team, their account will be deleted. This action cannot be undone."
  }
];

export const STUBTOAST: Omit<ToastType, "id"> = {
  title: "Another Message",
  type: "success",
  message: "Are you sure you would like to remove this user? "
};
