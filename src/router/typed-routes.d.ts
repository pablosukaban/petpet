import type { RouteRecordInfo } from "vue-router";

export type RouteNamedMap = {
  home: RouteRecordInfo<"home", "/", Record<never, never>, Record<never, never>>;
  fetching: RouteRecordInfo<"fetching", "/fetching", Record<never, never>, Record<never, never>>;
  posts: RouteRecordInfo<"posts", "/posts", Record<never, never>, Record<never, never>>;
  post: RouteRecordInfo<"post", "/posts/:id", { id: string | number }, { id: string }>;
  composables: RouteRecordInfo<
    "composables",
    "/composables",
    Record<never, never>,
    Record<never, never>
  >;
  userInfo: RouteRecordInfo<"userInfo", "/user/:id", { id: string | number }, { id: string }>;
  userPosts: RouteRecordInfo<
    "userPosts",
    "/user/:id/posts",
    { id: string | number },
    { id: string }
  >;
};

declare module "vue-router" {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap;
  }
  interface RouteMeta {
    title?: string | ((to: RouteLocationNormalized) => string);
  }
}
