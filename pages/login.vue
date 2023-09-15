<template>
  <div class="q-mt-lg q-mx-auto q-px-lg" style="width: min(400px, 100%)">
    <h2 class="text-h5 text-center">Log In</h2>
    <form @submit.prevent>
      <QInput v-model="logInEmailField" filled bg-color="white" type="email" label="Email" />
      <QInput v-model="logInPasswordField" filled bg-color="white" type="password" label="Password" class="q-mt-sm" />
      <div class="row justify-center">
        <QBtn type="submit" color="primary" class="q-mt-md" @click="handleLogIn">Log in</QBtn>
      </div>
    </form>
    <QSeparator class="q-my-lg" />
    <p class="text-center">or</p>
    <h2 class="text-h5 text-center">Sign up</h2>
    <form class="q-pb-lg" @submit.prevent>
      <QInput v-model="signUpEmailField" filled bg-color="white" type="email" label="Email" />
      <QInput
        v-model="signUpPasswordField"
        filled
        bg-color="white"
        type="password"
        label="Create Password"
        class="q-mt-sm"
      />
      <div class="row justify-center">
        <QBtn type="submit" color="primary" class="q-mt-md" @click="handleSignUp">Sign up</QBtn>
      </div>
    </form>
    <div class="row justify-center">
      <QBtn type="submit" color="dark" class="q-mt-md" @click="handleLogOut">Log out</QBtn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMyUserStore } from "~/stores/user";

const logInEmailField = ref("");
const logInPasswordField = ref("");
const signUpEmailField = ref("");
const signUpPasswordField = ref("");

const client = useSupabaseClient();

async function handleLogIn() {
  const { data: authData, error: authError } = await client.auth.signInWithPassword({
    email: logInEmailField.value,
    password: logInPasswordField.value,
  });
  if (authData.user) {
    const { data: apiData, error: apiError } = await useFetch("/api/users", {
      method: "get",
      query: {
        id: authData.user.id,
      },
    });
    if (apiData.value) {
      const store = useMyUserStore();
      store.user = apiData.value;
      console.log("store: ", store.user);
    }
  }
}

async function handleSignUp() {
  const { data: authData, error: authError } = await client.auth.signUp({
    email: signUpEmailField.value,
    password: signUpPasswordField.value,
  });
  if (authData.user) {
    const { data: apiData, error: apiError } = await useFetch("/api/users", {
      method: "post",
      body: { id: authData.user.id, email: authData.user.email },
    });
    if (apiData.value) {
      const store = useMyUserStore();
      store.user = apiData.value.user;
      console.log("store: ", store.user);
    }
  }
}

async function handleLogOut() {
  const { error } = await client.auth.signOut();
  const store = useMyUserStore();
  store.user = null;
  console.log("SIGNED OUT");
  console.log("error: ", error);
  console.log("store: ", store.user);
}

onMounted(() => {
  const user = useSupabaseUser();
  console.log("supabase user: ", user.value);
});
</script>

<style></style>
