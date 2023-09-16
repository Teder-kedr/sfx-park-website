import { useMyUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(() => {
  const store = useMyUserStore();
  if (store.user) return navigateTo("/account");
});
