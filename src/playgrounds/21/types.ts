export interface Member {
  id: number;
  name: string;
  email: string;
  permission: "view" | "edit";
  image?: string;
}
