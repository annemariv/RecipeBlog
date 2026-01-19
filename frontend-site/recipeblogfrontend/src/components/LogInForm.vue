<script>
import { loginUser } from "@/api/Users";

export default {
  name: "LoginForm",
  data() {
    return {
      Credentials: {
        LoginEmail: "",
        LoginPassword: ""
      }
    };
  },
  methods: {
    async login() {
      try {
        await loginUser(this.Credentials);
        this.$router.push("/account-loged-in");
      } catch (err) {
         console.error(err.response?.data || err.message);
      }
    }
  }
};
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="login">
    <div>
      <label>Email Address</label>
      <input
        v-model="Credentials.LoginEmail"
        type="email"
        required
      />
    </div>

    <div>
      <label>Password</label>
      <input
        v-model="Credentials.LoginPassword"
        type="password"
        required
      />
    </div>

    <button type="submit">Login</button>
  </form>
</template>
