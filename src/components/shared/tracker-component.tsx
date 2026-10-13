"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useTracker } from "@/hooks/useTracker";

const TrackerComponent = ({
  event,
  params,
}: {
  event: string;
  params?: Record<string, string>;
}) => {
  const { sendTrackEvent } = useTracker();
  const pathname = usePathname();
  const propertiesKey = useMemo(() => JSON.stringify(params ?? {}), [params]);
  const sentEvent = useRef<string | null>(null);

  useEffect(() => {
    const eventKey = `${event}:${pathname}:${propertiesKey}`;

    if (sentEvent.current === eventKey) {
      return;
    }

    sentEvent.current = eventKey;
    sendTrackEvent({
      event,
      pathname,
      properties: params,
    });
  }, [event, pathname, propertiesKey, params, sendTrackEvent]);

  return null;
};

export default TrackerComponent;
