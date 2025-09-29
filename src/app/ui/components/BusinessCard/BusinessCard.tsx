"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { findOneUserId } from "@/app/actions/business";
import { UserData } from "../../types/users/dto/user-response.dto";
import { Calendar } from "../Calendar/Calendar";

import styles from "./BusinessCard.module.css";

export const BusinessCard = ({ id }: { id: number }) => {
  const [userBusiness, setUserBusiness] = useState<UserData | null>(null);
  const userBusinessId = Number(userBusiness?.id);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fetchData = async () => {
      const data = await findOneUserId(id, token);
      setUserBusiness(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={styles.business_div}>
        <div className={styles.descriptions_div}>
          <div className={styles.thumb}>
            <Image
              src="/images/avatar.png"
              alt="photo"
              className={styles.photo}
              width={100}
              height={100}
            />
          </div>
          <div>
            <h3 className={styles.title}>{userBusiness?.name}</h3>

            <div className={styles.descriptions}>
              <p>
                Email •{" "}
                <span className={styles.descriptions_span}>
                  {userBusiness?.email}
                </span>
              </p>
              <p>
                Profession •{" "}
                <span className={styles.descriptions_span}>
                  {userBusiness?.profession ? userBusiness.profession : ""}
                </span>
              </p>
            </div>
          </div>
        </div>
        <p className={styles.p_profession}>
          {userBusiness?.description ? userBusiness.description : ""}
        </p>
      </div>
      <div className={styles.calendar_div}>
        <h4 className={styles.calendar_title}>Create appointment</h4>
        <Calendar id={userBusinessId} />
      </div>
    </>
  );
};
