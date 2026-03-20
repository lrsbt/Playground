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

export const EXAMPLE_DATA: Record<string, Omit<ToastType, "id">> = {
  success: {
    title: "Changes saved",
    type: "success",
    message:
      "Are you sure you would like to remove this user? If the user is an active member of your team, their account will be deleted. This action cannot be undone."
  },
  error: {
    title: "Link has expired",
    type: "error",
    message: "One of the links you provided in the SEO Campaign 01 has expired!"
  },
  warning: {
    title: "Broken Link!",
    type: "warning",
    message: "One of the links you provided in SEO Campaign 01 is broken!"
  },
  info: {
    title: "Links imported!",
    type: "info",
    message: "Your link-building campaign has been successfully imported!"
  }
};
