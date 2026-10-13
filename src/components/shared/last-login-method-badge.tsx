"use client";

import { useLocale } from "next-intl";

import { Badge } from "@/components/ui/badge";

export const LastLoginMethodBadge = () => {
  const lang = useLocale();
  return (
    <Badge className="text-xs absolute rounded-sm -top-2 -right-2 bg-linear-to-bl from-violet-500 to-fuchsia-500 text-white">
      {lang === "es" ? "Último método" : "Last method"}
    </Badge>
  );
};
