import Header from "@/components/header";
import Main from "@/components/main";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { useRef, useState } from "react";

const Home: NextPage = () => {
  const [username, setUsername] = useState("");
  const { data: ytData, isLoading } = trpc.useQuery([
    "yt-search",
    { username: username },
  ]);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  return (
    <Main>
      <Header />
      <input ref={usernameRef} />
      <button onClick={() => setUsername(usernameRef.current?.value || "")}>
        click
      </button>
      {isLoading && <p>loading...</p>}
      {!isLoading &&
        ytData?.channels?.map((channel) => (
          <div key={channel.id}>
            <p>{channel.name || "User not found"}</p>
            <img src={channel.thumbnailURL || ""} />
          </div>
        ))}
    </Main>
  );
};

export default Home;
