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
  <div class="page-wrapper">
  <h1 class="Title">Sign Up an account</h1>
  <form class="SignUpForm" @submit.prevent="signUp">
    <div>
      <label class="Subtitle">Email Address</label>
      <input class="input-container" v-model="NewUser.EmailAddress" type="email" placeholder="Enter your email" required/>
    </div>
    <div>
      <label class="Subtitle">Username</label>
      <input class="input-container" v-model="NewUser.UserName" type="name" placeholder="Enter username" pattern=".{4,}" title="At least 4 characters long" required/>
    </div>
    <div>
      <label class="Subtitle">Password</label>
      <input class="input-container" v-model="NewUser.Password" type="password" placeholder="Enter password" pattern=".{8,}" title="At least 8 chracters long" required/>
    </div>
    <div>
      <label class="Subtitle">Phone Number (2FA)</label>
      <input class="input-container" v-model="NewUser.PhoneNumber2FA" type="tel" placeholder="Optionally add your phone number for authentication" 
      pattern="^\+?[0-9]{8,15}$" 
      title="Enter a valid phone number" maxlength="16"/>
    </div>
    <button class="submit" type="submit">Sign Up</button>
  </form>
  </div>
</template>

<style scoped>
/* Replaces the 'body' selector to center the form on the page */
.page-wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f0; /* Light background to see the dark form */
}

.SignUpForm {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 30px;
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 15px; /* Adds space between the inputs */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
}

.Title {
  color: #15172b;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

.Subtitle {
  color: #eee;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
}

.input-container {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 16px;
  height: 45px;
  outline: 0;
  padding: 0 20px;
  width: 100%;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 20px;
  text-align: center;
  width: 100%;
  transition: background-color 0.2s;
}

.submit:hover {
  background-color: #0077c2;
}

.submit:active {
  background-color: #06b;
}
</style>
