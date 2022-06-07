<script setup>
import { computed } from "vue";
import { useStoreAuth } from "@/stores/auth";
import Api from "@/axios/axios";
import jwt_decode from "jwt-decode";
import Toast from "@/components/lib/Toast.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
const storeAuth = useStoreAuth();
const router = useRouter();
const email = ref();
const password = ref();

const doLogin = async (username, password) => {
  try {
    const response = await Api.post("siswa/auth/login", {
      email: username,
      password,
    });
    // console.log(response);
    if (response.code === 200) {
      const { token } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("isLogin", true);
      console.log("Login berhasil");
      storeAuth.setIsLogin(true);
      storeAuth.setToken(token);
      router.push({ name: "AdminDashboard" });
      let decoded = jwt_decode(token);
      // store.commit("setDataAuth", decoded);
      // console.log(decoded);
      Toast.success("Success", "Login Berhasil!");
    } else {
      Toast.danger("Warning", "Login gagal!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    Toast.danger("Warning", "Login gagal!");
  }
};
const onSubmit = () => {
  doLogin(email.value, password.value);
};
</script>
<template>
  <div class="">
    <div class="hero bg-base-100 py-32">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Menu Administrator</h1>
          <p class="py-6">Masuk sebagai Administrator.</p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email / Username</span>
              </label>
              <input
                v-model="email"
                name="username"
                type="text"
                placeholder="email"
                class="input input-bordered input-secondary"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                v-model="password"
                name="password"
                type="password"
                placeholder="password"
                class="input input-bordered input-secondary"
              />
              <!-- <label class="label">
                <a href="#" class="label-text-alt link link-hover"
                  >Forgot password?</a
                >
              </label> -->
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary" @click="onSubmit()">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
