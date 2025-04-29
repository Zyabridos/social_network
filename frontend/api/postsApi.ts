import createCrudApi from "./crudFactory";
import type { PostItem } from "../types/posts";

const base = `${process.env.NEXT_PUBLIC_API_BASE}/api/posts`;

export const postsApi = createCrudApi<PostItem>(base);
