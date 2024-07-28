import React from "react";
import { useEffect, useState } from "react";
import { log } from "../Logging/Logger";

const HeartBeat = ({
  active,
  timeout,
  URL,
  notify,
}: {
  active: boolean;
  timeout: number;
  URL: string;
  notify(count: Number, connected: boolean): void;
}) => {
  const [count, setCount] = useState(1);
  const [ws, setWs] = useState<any>(null);

  useEffect(() => {
    if (active) {
      const timeoutId = setTimeout(() => {
        setCount(count + 1);
        const wsClient = new WebSocket(URL);
        wsClient.onopen = () => {
          setWs(wsClient);
          notify(count, true);
        };
        wsClient.onclose = () => {
          console.log("Connection closed...");
          setWs(null);
          setCount(0);
          notify(count, false);
        };
        // }
      }, timeout);

      return () => {
        clearTimeout(timeoutId);
        if (ws) {
          ws.close();
        }
      };
    }
    // eslint-disable-next-line
  }, [count]);

  return <></>;
};

export default HeartBeat;
