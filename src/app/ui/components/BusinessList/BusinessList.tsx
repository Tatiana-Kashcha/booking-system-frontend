"use client";

import { useState, useEffect } from "react";

import { findAllUserRole } from "@/app/actions/business";
import { UserData, Role } from "../../types/users/dto/user-response.dto";
import { BusinessListItems } from "../BusinessListItems/BusinessListItems";

import styles from "./BusinessList.module.css";

export const BusinessList = () => {
  const [businessArr, setBusinessArr] = useState<UserData[] | null>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const fetchData = async () => {
      const data = await findAllUserRole(Role.BUSINESS, token);
      setBusinessArr(data);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.business_div}>
      <h1 className={styles.title}>Business list</h1>

      <ul className={styles.list}>
        {businessArr?.map((item: UserData) => (
          <li key={item.id}>
            <BusinessListItems userBusiness={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
