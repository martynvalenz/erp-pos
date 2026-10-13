"use client";

import { useEffect } from "react";
import { useDeviceStore } from "@/hooks/useDeviceStore";

const DeviceProvider = () => {
  // const {getLocation} = useLocation()
  const { setDeviceInfo } = useDeviceStore();
  // biome-ignore lint/correctness/useExhaustiveDependencies: Because yes
  useEffect(
    () => {
      (async () => {
        // await getLocation()
        await setDeviceInfo();
      })();
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return <></>;
};

export default DeviceProvider;
