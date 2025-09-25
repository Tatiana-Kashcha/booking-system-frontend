"use client";

import { useState } from "react";

import Image from "next/image";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import showIcon from "../../icons/eye.svg";
import hideIcon from "../../icons/eye-slash.svg";

import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const auth = getAuth();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // const userCredential = await signInWithEmailAndPassword(
      //   auth,
      //   form.elements.email.value,
      //   form.elements.password.value
      // );

      console.log("Login data:", { email, password });
    } catch (error) {
      console.log(error);
      Notify.failure("Login error. Please check the data.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <label className={styles.label}>
          Email
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <div className={styles.div_password}>
          <label className={styles.label}>
            Password
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your password"
              // minLength="5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <span className={styles.toggle_btn} onClick={handleShowPassword}>
            <Image
              src={showPassword ? showIcon : hideIcon}
              alt="toggle password"
              width={20}
              height={20}
              className={styles.photo}
            />
          </span>
        </div>

        <div className={styles.div_button}>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
