const analyticsEventsEndpoint = "/api/v1/events-tracker";

export type AnalyticsEventProperties = Record<string, unknown>;

export const trackAnalyticsEvent = (input: {
  event: string;
  pathname: string;
  properties?: AnalyticsEventProperties;
}) => {
  const payload = JSON.stringify({
    event: input.event,
    pathname: input.pathname,
    properties: input.properties ?? {},
  });

  const body = new Blob([payload], { type: "application/json" });

  if (
    typeof navigator.sendBeacon === "function" &&
    navigator.sendBeacon(analyticsEventsEndpoint, body)
  ) {
    return;
  }

  void fetch(analyticsEventsEndpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Analytics must never interrupt the page being viewed.
  });
};
