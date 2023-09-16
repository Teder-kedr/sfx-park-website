import { useMyUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async () => {
  const supabaseUser = useSupabaseUser();
  const store = useMyUserStore();
  if (!supabaseUser.value) return;

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
