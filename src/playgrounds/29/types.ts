export interface Page {
  id: number;
  color: string;
  title: string[];
  info: string[];
  link: string;
  socials: {
    likes: number;
    views: number;
    comments: number;
  };
  image: string;
}
