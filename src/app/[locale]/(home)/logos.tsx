"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function LogoShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Clone the logos to ensure smooth infinite scrolling
    const content = scrollContainer.querySelector(".scroll-content");
    if (content) {
      scrollContainer.appendChild(content.cloneNode(true));
    }
  }, []);

  return (
    <section className="w-full overflow-hidden bg-white py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <h2 className="mb-12 text-right text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl">
          Zaufali nam
        </h2>
        <div ref={scrollRef} className="relative flex w-full overflow-hidden">
          <div className="animate-scroll scroll-content flex min-w-full shrink-0 items-center justify-around gap-8">
            <Link
              href="https://www.mostostal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-16 w-40 items-center justify-center"
            >
              <Image
                src="/placeholder.svg"
                alt="Mostostal Logo"
                className="h-auto w-full object-contain"
                width={160}
                height={64}
              />
            </Link>
            <Link
              href="https://www.zdz.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-16 w-40 items-center justify-center"
            >
              <Image
                src="/placeholder.svg"
                alt="ZDZ Logo"
                className="h-auto w-full object-contain"
                width={160}
                height={64}
              />
            </Link>
            <Link
              href="https://www.ebud.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-16 w-40 items-center justify-center"
            >
              <Image
                src="/placeholder.svg"
                alt="EBUD Logo"
                className="h-auto w-full object-contain"
                width={160}
                height={64}
              />
            </Link>
            <Link
              href="https://www.frombork-cathedral.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-16 w-40 items-center justify-center"
            >
              <Image
                src="/placeholder.svg"
                alt="Frombork Cathedral Logo"
                className="h-auto w-full object-contain"
                width={160}
                height={64}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
