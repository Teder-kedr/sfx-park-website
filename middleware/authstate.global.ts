import { useMyUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async () => {
  if (process.server) return;

  const supabaseUser = useSupabaseUser();
  console.log("supabase user: ", supabaseUser.value);

  const store = useMyUserStore();
  console.log("store: ", store);

  if (!supabaseUser.value) return;

  if (!store.user || supabaseUser.value.id !== store.user.id) {
    console.log("strating fetch...");

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
