"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { login } from "@/app/actions/auth";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import showIcon from "../../icons/eye.svg";
import hideIcon from "../../icons/eye-slash.svg";

import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/business");
    }
  }, [router]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsDisabled(true);
      const userCredential = await login({ email, password });
      if (userCredential) {
        localStorage.setItem("authToken", userCredential.token);
        router.push("/business");
      }
    } catch (error) {
      console.log(error);
      Notify.failure("Login error. Please check the data.");
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
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
              autoFocus
            />
          </label>
          <div className={styles.div_password}>
            <label className={styles.label}>
              Password
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Your password"
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
            <button
              type="submit"
              className={styles.button}
              disabled={isDisabled}
            >
              {isDisabled ? "Login..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
