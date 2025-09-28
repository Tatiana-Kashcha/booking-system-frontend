"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { update } from "@/app/actions/auth";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Role } from "../../types/users/dto/user-response.dto";
import { UserData } from "../../types/users/dto/user-response.dto";
import { findCurrentUser } from "@/app/actions/users";
import { DeleteProfileBtn } from "../DeleteProfileBtn/DeleteProfileBtn";

import styles from "./EditForm.module.css";

export const EditForm = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>(Role.CLIENT);
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);

  console.log(currentUser);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fetchData = async () => {
      const data = await findCurrentUser(token);
      setCurrentUser(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
      setRole(currentUser.role);
      setProfession(currentUser.profession || "");
      setDescription(currentUser.description || "");
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsDisabled(true);

      if (!currentUser?.id) {
        Notify.failure("No user ID found");
        return;
      }

      const userCredential = await update(currentUser?.id, {
        id: currentUser?.id,
        name,
        email,
        role,
        profession,
        description,
      });

      if (userCredential) {
        localStorage.setItem("authToken", userCredential.token);
      }
    } catch (error) {
      console.log(error);
      Notify.failure("Update error. Please check the data.");
    } finally {
      setIsDisabled(false);
    }
  };

  const currentId = Number(currentUser?.id);

  return (
    <>
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className={styles.role_div}>
            <div className={styles.thumb}>
              <Image
                src="/images/avatar.png"
                alt="photo"
                className={styles.photo}
                width={100}
                height={100}
              />
            </div>
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
          </div>

          <label className={styles.label}>
            Name
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={name || ""}
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
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          {role === Role.BUSINESS && (
            <>
              <label className={styles.label}>
                Profession
                <input
                  type="text"
                  name="profession"
                  placeholder="Your profession"
                  value={profession || ""}
                  onChange={(e) => setProfession(e.target.value)}
                  className={styles.input}
                />
              </label>
              <label className={styles.label}>
                Description
                <textarea
                  name="description"
                  placeholder="Enter description..."
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                  className={styles.input}
                  rows={4}
                />
              </label>
            </>
          )}

          <div className={styles.div_button}>
            <button
              type="submit"
              className={styles.button}
              disabled={isDisabled}
            >
              {isDisabled ? "Edit profile..." : "Edit profile"}
            </button>
          </div>
        </form>
      </div>
      <div className={styles.delete_div}>
        <p className={styles.attention}>
          Attention! Deleting the profile with all appointments!
        </p>
        <DeleteProfileBtn id={currentId} />
      </div>
    </>
  );
};
