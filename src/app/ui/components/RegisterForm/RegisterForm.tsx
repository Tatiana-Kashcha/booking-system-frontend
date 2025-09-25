"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { register } from "@/app/actions/auth";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Role } from "../../types/users/dto/user-response.dto";
import showIcon from "../../icons/eye.svg";
import hideIcon from "../../icons/eye-slash.svg";

import styles from "./RegisterForm.module.css";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>(Role.CLIENT);
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await register({
        name,
        email,
        password,
        role,
        profession,
        description,
      });

      if (userCredential) {
        router.push("/business");
      }

      console.log(userCredential);
    } catch (error) {
      console.log(error);
      Notify.failure("Register error. Please check the data.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.radio_group}>
          <label className={styles.label_radio}>
            <input
              type="radio"
              name="role"
              value={Role.CLIENT}
              checked={role === Role.CLIENT}
              onChange={() => setRole(Role.CLIENT)}
              className={styles.input_radio}
            />
            Client
          </label>

          <label className={styles.label_radio}>
            <input
              type="radio"
              name="role"
              value={Role.BUSINESS}
              checked={role === Role.BUSINESS}
              onChange={() => setRole(Role.BUSINESS)}
              className={styles.input_radio}
            />
            Business
          </label>
        </div>

        <label className={styles.label}>
          Name
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </label>
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
          {role === Role.BUSINESS && (
            <>
              <label className={styles.label}>
                Profession
                <input
                  type="text"
                  name="profession"
                  placeholder="Your profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className={styles.input}
                />
              </label>
              <label className={styles.label}>
                Description
                <textarea
                  name="description"
                  placeholder="Enter description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={styles.input}
                  rows={4}
                />
              </label>
            </>
          )}
        </div>

        <div className={styles.div_button}>
          <button type="submit" className={styles.button}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
