import ReactQueryProvider from "@/providers/react-query-provider";
import { ReactNode, Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/toast";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import DeviceProvider from "@/providers/device-provider";
import { PwaUpdatePrompt } from "@/components/shared/pwa-update-prompt";

const ErpLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <Suspense fallback={null}>
        <NextIntlClientProvider>
          <Suspense fallback={null}>
            <PwaUpdatePrompt />
          </Suspense>
          <Suspense fallback={null}>
            <DeviceProvider />
          </Suspense>
          <NuqsAdapter>{children}</NuqsAdapter>
          <Toaster />
        </NextIntlClientProvider>
      </Suspense>
    </ReactQueryProvider>
  );
};

export default ErpLayout;
