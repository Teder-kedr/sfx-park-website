<template>
  <div class="q-mt-lg q-mx-auto q-px-lg" style="width: min(400px, 100%)">
    <h2 class="text-h5 text-center">Log In</h2>
    <form @submit.prevent>
      <QInput v-model="logInEmailField" filled bg-color="white" type="email" label="Email" />
      <QInput v-model="logInPasswordField" filled bg-color="white" type="password" label="Password" class="q-mt-sm" />
      <div class="row justify-center">
        <QBtn :loading="logInLoading" type="submit" color="primary" class="q-mt-md" @click="handleLogIn"> Log in </QBtn>
      </div>
      <QCard v-if="logInError" class="q-pa-lg q-my-md text-red text-center" flat bordered>
        Error: {{ logInError }}
      </QCard>
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
        <QBtn :loading="signUpLoading" type="submit" color="primary" class="q-mt-md" @click="handleSignUp">
          Sign up
        </QBtn>
      </div>
      <QCard v-if="signUpError" class="q-pa-lg q-mt-md text-red text-center" flat bordered>
        Error: {{ signUpError }}
      </QCard>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useMyUserStore } from "~/stores/user";

definePageMeta({
  middleware: ["to-login"],
});

const logInEmailField = ref("");
const logInPasswordField = ref("");
const signUpEmailField = ref("");
const signUpPasswordField = ref("");

const logInLoading = ref(false);
const signUpLoading = ref(false);
const logInError = ref("");
const signUpError = ref("");

const client = useSupabaseClient();

async function handleLogIn() {
  logInLoading.value = true;
  try {
    const { data: authData, error: authError } = await client.auth.signInWithPassword({
      email: logInEmailField.value,
      password: logInPasswordField.value,
    });
    if (authError) throw authError;
    if (authData.user) {
      const { data: apiData, error: apiError } = await useFetch("/api/users", {
        method: "get",
        query: {
          id: authData.user.id,
        },
      });
      if (apiError.value) throw apiError.value;
      if (apiData.value) {
        const store = useMyUserStore();
        store.user = apiData.value;
      }
    }
    const router = useRouter();
    router.push("/");
  } catch (error) {
    logInLoading.value = false;
    console.error(error);
    if (error instanceof Error) {
      logInError.value = error.message;
    }
  }
}

async function handleSignUp() {
  signUpLoading.value = true;
  try {
    const { data: authData, error: authError } = await client.auth.signUp({
      email: signUpEmailField.value,
      password: signUpPasswordField.value,
    });
    if (authError) throw authError;
    if (authData.user) {
      const { data: apiData, error: apiError } = await useFetch("/api/users", {
        method: "post",
        body: { id: authData.user.id, email: authData.user.email },
      });
      if (apiError.value) throw apiError.value;
      if (apiData.value) {
        const store = useMyUserStore();
        store.user = apiData.value.user;
      }
    }
    const router = useRouter();
    router.push("/");
  } catch (error) {
    signUpLoading.value = false;
    console.error(error);
    if (error instanceof Error) {
      signUpError.value = error.message;
    }
  }
}
</script>

<style></style>
