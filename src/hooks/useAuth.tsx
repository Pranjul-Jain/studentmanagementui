import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/auth/slice/AuthSlice";

const useAuth = () => {
  const [user, setUser] = React.useState({});
  const [laoding, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        loginUser(user);
      } else {
        setLoading(false);
      }
    });
  }, []);

  return [user, laoding];

  async function loginUser(user: any) {
    try {
      let userEmail = user.email;

      const q = query(collection(db, "users"), where("email", "==", userEmail));

      const docs = await getDocs(q);

      let role = "viewer";

      if (docs.docs.length !== 0) {
        role = docs.docs[0].data().role;
      }

      await dispatch(
        login({
          user: user.displayName,
          email: user.email,
          role: role || "viewer",
        })
      );

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }
};

export default useAuth;
