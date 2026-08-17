"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { getUser } from "@/lib/firebase/firestore";

export interface UserData {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  authProvider: "email" | "google" | "apple";
  role: "student" | "admin";
  subscriptionStatus: "free" | "active" | "cancelled";
  dailyAiMessages: number;
  dailySummaries: number;
  dailyPracticeSessions: number;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isPro: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isPro: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const data = await getUser(firebaseUser.uid);
        setUserData(data as UserData | null);
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isPro =
    userData?.subscriptionStatus === "active";

  return (
    <AuthContext.Provider value={{ user, userData, loading, isPro }}>
      {children}
    </AuthContext.Provider>
  );
}
