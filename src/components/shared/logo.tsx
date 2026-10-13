import Image from "next/image";
import Link from "next/link";
import { env } from "@/env";

export const Logo = ({ href, size }: { href: string; size?: number }) => {
  const width = size || 40;

  return (
    <Link href={href} className="hover:opacity-80 transition-opacity">
      <Image
        src={env.NEXT_PUBLIC_APP_IMAGO}
        alt={env.NEXT_PUBLIC_TITLE || "logo"}
        width={width}
        height={Math.round((width * 268) / 300)}
        style={{ height: "auto" }}
      />
    </Link>
  );
};

export const LogoText = ({ href, size }: { href: string; size?: number }) => {
  const width = size || 150;

  return (
    <Link href={href} className="hover:opacity-80 transition-opacity">
      <Image
        src={env.NEXT_PUBLIC_APP_LOGO}
        alt={env.NEXT_PUBLIC_TITLE || "logo"}
        width={width}
        height={Math.round((width * 150) / 642)}
        style={{ height: "auto" }}
      />
    </Link>
  );
};
