import { useMyUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async () => {
  const supabaseUser = useSupabaseUser();
  if (!supabaseUser.value) return;

  const store = useMyUserStore();

  if (!store.user || supabaseUser.value.id !== store.user.id) {
    const { data: apiData } = await useFetch("/api/users", {
      method: "get",
      query: {
        id: supabaseUser.value.id,
      },
    });
    if (apiData.value) {
      store.user = apiData.value;
    }
  }
});
