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

        //success page
        this.$router.push("/account-created");
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    }
  }
};
</script>

<template>
  <h1>Sign Up an account</h1>
  <form @submit.prevent="signUp">
    <div>
      <label>Email Address</label>
      <input v-model="NewUser.EmailAddress" type="email" placeholder="Enter your email" required/>
    </div>
    <div>
      <label>Username</label>
      <input v-model="NewUser.UserName" type="name" placeholder="Enter username" pattern=".{4,}" title="At least 4 characters long" required/>
    </div>
    <div>
      <label>Password</label>
      <input v-model="NewUser.Password" type="password" placeholder="Enter password" pattern=".{8,}" title="At least 8 chracters long" required/>
    </div>
    <div>
      <label>Phone Number (2FA)</label>
      <input v-model="NewUser.PhoneNumber2FA" type="tel" placeholder="Optionally add your phone number for authentication" 
      pattern="^\+?[0-9]{8,15}$" 
      title="Enter a valid phone number" maxlength="16"/>
    </div>
    <button type="submit">Sign Up</button>
  </form>
</template>
