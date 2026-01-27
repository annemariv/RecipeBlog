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
    const user = await loginUser(this.Credentials);
    localStorage.setItem("LoggedInUserID", user.UserID);
    localStorage.setItem("isAdmin", user.IsAdmin);
    this.$router.push("/account-loged-in");
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}
  }
};
</script>

<template>
  <main>
  <h1 class="PageTitle text-center">Log in to your account</h1>
  <form @submit.prevent="login" class="p-4 rounded-4 shadow-lg text-white item-center mx-auto my-4 mb-4" style="background-color: #7f5539; width: 100%; max-width: 360px;">
    <div  class="mb-3">
      <label class="form-label small fw-bold text-light">Email Address</label>
      <input
        v-model="Credentials.LoginEmail"
        type="email"
         class="form-control border-0 text-black rounded-3" 
          style="background-color: white;"
          placeholder="Enter your email" 
        required
      />
    </div>

    <div  class="mb-3">
      <label class="form-label small fw-bold text-light">Password</label>
      <input
        v-model="Credentials.LoginPassword"
        type="password"
        class="form-control border-0 text-black rounded-3" 
        style="background-color: white;"
        placeholder="Enter your password" 
        required
      />
    </div>

    <button type="submit" class="btn btn-primary w-100 py-2 fw-bold rounded-3 border-0" style="background-color: #08d;">Login</button>
  </form>
  </main>
</template>
