import createCrudApi from "./crudFactory";
import type { PostItem } from "../types/posts";

const base = "/posts";

export const postsApi = createCrudApi<PostItem>(base);
