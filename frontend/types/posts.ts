export type PostItem = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export type PostsState = {
  list: PostItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};
