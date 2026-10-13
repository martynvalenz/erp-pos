import { getCookie, setCookie } from "cookies-next";
import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { logger } from "./logger.middleware";

export interface DeviceState {
  platform: string;
  userAgent: string;
  city: string;
  country: string;
  countryCode: string;
  countryCallingCode: string;
  timezone: string;
  device: string;
  ipAddress?: string;
  position: {
    latitude: number;
    longitude: number;
  };
  locationErrorDialog: boolean;
  defaultCurrency: string;
}

export interface DeviceActions {
  setDeviceInfo: () => void;
  setDefaultCurrency: (currency: string) => void;
}

export const deviceApi: StateCreator<
  DeviceState & DeviceActions,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set, get) => ({
  platform: "Unknown OS",
  userAgent: "",
  timezone: "",
  device: "",
  ipAddress: "",
  country: "",
  countryCode: "",
  countryCallingCode: "",
  city: "",
  setDeviceInfo: async () => {
    const Cookie_expiry = new Date();
    Cookie_expiry.setDate(Cookie_expiry.getDate() + 10e5);

    let osVal = "Unknown OS";
    if (navigator.userAgent.toLowerCase().includes("windows"))
      osVal = "Windows";
    else if (navigator.userAgent.toLowerCase().includes("macintosh"))
      osVal = "macOS";
    else if (navigator.userAgent.toLowerCase().includes("linux"))
      osVal = "Linux";
    else if (navigator.userAgent.toLowerCase().includes("android"))
      osVal = "Android";
    else if (navigator.userAgent.toLowerCase().includes("iphone"))
      osVal = "iOS";
    // axios.defaults.headers.common['operating-system'] = osValue;

    set(() => ({ platform: osVal }), false, "setPlatform");
    setCookie("platform", osVal, { path: "/" });

    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    set(() => ({ timezone: localTimeZone }), false, "setTimeZoneInfo");
    setCookie("timeZone", localTimeZone, { path: "/" });

    const code = get().device;
    if (!code) {
      const deviceUID = crypto.randomUUID();
      set(() => ({ device: deviceUID }), false, "setDeviceUID");
      setCookie("device", deviceUID, {
        expires: Cookie_expiry,
        path: "/",
      });
    } else {
      setCookie("device", code, {
        expires: Cookie_expiry,
        path: "/",
      });
    }

    set(() => ({ userAgent: navigator.userAgent }), false, "setUserAgent");
    setCookie("userAgent", navigator.userAgent, {
      expires: Cookie_expiry,
      path: "/",
    });
    const device = getCookie("device") || null;
    if (!device) {
      setCookie("device", code);
    }

    const res = await fetch("https://api.country.is/");
    const fetchData = await res.json();
    const { ip, country } = fetchData;

    if (country !== get().countryCode) {
      set(() => ({ ipAddress: ip }), false, "setIpAddress");
      set(() => ({ countryCode: country }), false, "setCountry");
      fetch("https://ipapi.co/json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          set(() => ({ city: data.region }), false, "setCity");
          setCookie("city", data.region, {
            expires: Cookie_expiry,
            path: "/",
          });

          set(() => ({ country: data.country_name }), false, "setCountry");
          setCookie("country", data.country_name, {
            expires: Cookie_expiry,
            path: "/",
          });
          set({ defaultCurrency: data.currency.toLowerCase() });
          set(() => ({
            countryCallingCode: data.country_calling_code,
          }));
        });
    }
  },
  // setLocation: async () => {
  //   const Cookie_expiry = new Date();
  //   Cookie_expiry.setDate(Cookie_expiry.getDate() + 10e5);
  //   const country = get().country;
  //   // Get IP Address
  //   const res = await fetch(
  //     'https://www.cloudflare.com/cdn-cgi/trace'
  //   );
  //   const data = await res.text();
  //   const ipData = data.split('\n');
  //   const ipValue = ipData[2].split('=')[1];
  //   set(() => ({ ipAddress: ipValue }), false, 'setIpAddress');
  //   setCookie('ipAddress', ipValue, {
  //     expires: Cookie_expiry,
  //     path: '/',
  //   });
  //   if (!country) {
  //     fetch('https://ipapi.co/json')
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         set(() => ({ city: data.regionName }), false, 'setCity');
  //         setCookie('city', data.regionName, {
  //           expires: Cookie_expiry,
  //           path: '/',
  //         });

  //         set(() => ({ country: data.country }), false, 'setCountry');
  //         setCookie('country', data.country, {
  //           expires: Cookie_expiry,
  //           path: '/',
  //         });
  //       });
  //   }
  // },
  position: {
    latitude: 0,
    longitude: 0,
  },
  // setPosition: (coords) => {
  //   set(() => ({ position: coords }), false, 'setPosition');
  // },
  // locationErrorDialog: false,
  // setLocationErrorDialog: (value) => {
  //   set(
  //     () => ({ locationErrorDialog: value }),
  //     false,
  //     'setLocationErrorDialog'
  //   );
  // },
  locationErrorDialog: false,
  defaultCurrency: "",
  setDefaultCurrency: (currency) => {
    set(() => ({ defaultCurrency: currency }), false, "setDefaultCurrency");
  },
});

export const useDeviceStore = create<DeviceState & DeviceActions>()(
  logger(devtools(persist(deviceApi, { name: "device-store" }))),
);
