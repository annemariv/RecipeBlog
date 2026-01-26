<script>
import { signUpUser } from "@/api/Users";

export default {
  name: "SignUpForm",
  data() {
    return {
      NewUser: {
        EmailAddress: "",
        UserName: "",
        Password: "",
        PhoneNumber2FA: ""
      }
    };
  },
  methods: {
    async signUp() {
      try {
        const response = await signUpUser(this.NewUser);
        console.log("User created:", response.data);
        this.$router.push("/account-created");
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }
  }
};
</script>

<template>
  <div class="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center">
    
    <h1 class="display-5 fw-bold text-dark mb-4">Sign Up an account</h1>

    <form 
      @submit.prevent="signUp" 
      class="p-4 rounded-4 shadow-lg text-white" 
      style="background-color: #15172b; width: 100%; max-width: 360px;"
    >
      
      <div class="mb-3">
        <label class="form-label small fw-bold text-light">Email Address</label>
        <input 
          v-model="NewUser.EmailAddress" 
          type="email" 
          class="form-control border-0 text-white rounded-3" 
          style="background-color: #303245;"
          placeholder="Enter your email" 
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label small fw-bold text-light">Username</label>
        <input 
          v-model="NewUser.UserName" 
          type="text" 
          class="form-control border-0 text-white rounded-3" 
          style="background-color: #303245;"
          placeholder="Enter username" 
          pattern=".{4,}" 
          title="At least 4 characters long" 
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label small fw-bold text-light">Password</label>
        <input 
          v-model="NewUser.Password" 
          type="password" 
          class="form-control border-0 text-white rounded-3" 
          style="background-color: #303245;"
          placeholder="Enter password" 
          pattern=".{8,}" 
          title="At least 8 characters long" 
          required
        />
      </div>

      <div class="mb-4">
        <label class="form-label small fw-bold text-light">Phone Number (2FA)</label>
        <input 
          v-model="NewUser.PhoneNumber2FA" 
          type="tel" 
          class="form-control border-0 text-white rounded-3" 
          style="background-color: #303245;"
          placeholder="Optionally add phone number" 
          pattern="^\+?[0-9]{8,15}$" 
          maxlength="16"
        />
      </div>

      <button 
        type="submit" 
        class="btn btn-primary w-100 py-2 fw-bold rounded-3 border-0"
        style="background-color: #08d;"
      >
        Sign Up
      </button>

    </form>
  </div>
</template>