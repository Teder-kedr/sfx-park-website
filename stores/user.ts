import { defineStore } from "pinia";
import type { User } from "~/utils/types";

export const useMyUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    toogleLiked(id: string) {
      if (this.user) {
        if (this.user.liked.includes(id)) {
          const index = this.user.liked.indexOf(id);
          this.user.liked.splice(index, 1);
        } else {
          this.user.liked.push(id);
        }
      }
    },
  },
});
