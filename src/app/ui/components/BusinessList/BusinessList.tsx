"use client";

import { useState, useEffect } from "react";

import { findAllUserRole } from "@/app/actions/business";
import { findCurrentUser } from "@/app/actions/users";
import { UserData, Role } from "../../types/users/dto/user-response.dto";
import { BusinessListItems } from "../BusinessListItems/BusinessListItems";

import styles from "./BusinessList.module.css";

export const BusinessList = () => {
  const [businessArr, setBusinessArr] = useState<UserData[] | null>([]);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const currentUserRole = currentUser?.role;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fetchData = async () => {
      const data = await findAllUserRole(Role.BUSINESS, token);
      setBusinessArr(data);
    };

    const fetchCurrentData = async () => {
      const data = await findCurrentUser(token);
      setCurrentUser(data);
    };

    fetchCurrentData();
    fetchData();
  }, []);

  return (
    <div className={styles.business_div}>
      <p className={styles.p}>
        Welcome <span className={styles.span}>{currentUser?.name}</span> to our
      </p>
      <h1 className={styles.title}>Business list</h1>

      <ul className={styles.list}>
        {businessArr?.map((item: UserData) => (
          <li key={item.id}>
            <BusinessListItems
              userBusiness={item}
              currentUserRole={currentUserRole}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
