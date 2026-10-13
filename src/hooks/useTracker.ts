import {
  type AnalyticsEventProperties,
  trackAnalyticsEvent,
} from "@/lib/analytics";

interface UseTrackingData {
  event: string;
  pathname: string;
  properties?: AnalyticsEventProperties;
}

export const useTracker = () => {
  const sendTrackEvent = (data: UseTrackingData) => trackAnalyticsEvent(data);

  return {
    sendTrackEvent,
  };
};
