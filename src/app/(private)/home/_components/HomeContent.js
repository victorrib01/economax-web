"use client";
import LastRegisters from "./LastRegisters";
import RegisterForm from "./RegisterForm";
import { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { getLastSpends } from "@/services/spends";

export default function HomeContent() {
  const { cookies } = useAuth();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function getLast5Records() {}
  //   setLoading(true);
  //   try {
  //     const response = await getLastSpends({
  //       jwt: cookies.jwt,
  //       mes: 6,
  //       year: 2023,
  //     });
  //     setResults(response);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error("getLast5Records", err);
  //     setLoading(false);
  //   }
  // }
  return (
    <>
      <div className="flex w-full items-center justify-center h-[70%]">
        <RegisterForm getLast5Records={getLast5Records} />
      </div>
      {/* <div className="flex w-full items-center justify-center h-[30%]">
        <LastRegisters
          cookies={cookies}
          getLast5Records={getLast5Records}
          loading={loading}
          results={results}
        />
      </div> */}
    </>
  );
}
