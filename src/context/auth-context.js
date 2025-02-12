import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { supabase } from "@/src/database/supabase"; // Supabase instance // Ensure this points to your Supabase instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    // Fetch session on initial load
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session && session.user) {
      console.log("User detected in session: ", session.user);
      router.replace("(dashboard)"); // Redirect to dashboard if authenticated
    }
  }, [session, router]);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
