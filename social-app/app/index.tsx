import { Redirect, useRouter } from "expo-router";
import React, { useEffect } from "react";

import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

const Redirection = () => {
  const router = useRouter();
  const convex = useConvex();

  useEffect(() => {
    const loadPage = async () => {
      const user = await convex.query(api.user.getMyUser);
      if (!user) {
        router.replace("/get-started/");
      }
    };
    loadPage();
  }, []);

  return <Redirect href="/(application)" />;
};

export default Redirection;
