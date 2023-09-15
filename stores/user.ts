import { defineStore } from "pinia";
import type { User } from "~/utils/types";

export const useMyUserStore = defineStore("user", () => {
  const user: Ref<User | null> = ref(null);
  return { user };
});
