// src/components/navigation/locale-switcher-select.tsx
"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { Locale, usePathname, useRouter } from "@/i18n/routing";

// Define a simple object to map locale codes to flags and names
const localeMap: Record<string, { flag: ReactNode; name: string }> = {
  en: {
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="h-3 w-3"
      >
        <rect
          x="1"
          y="4"
          width="30"
          height="24"
          rx="4"
          ry="4"
          fill="#071b65"
        ></rect>
        <path
          d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z"
          fill="#fff"
        ></path>
        <path
          d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z"
          fill="#b92932"
        ></path>
        <path
          d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z"
          fill="#b92932"
        ></path>
        <path
          d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z"
          fill="#fff"
        ></path>
        <rect x="13" y="4" width="6" height="24" fill="#fff"></rect>
        <rect x="1" y="13" width="30" height="6" fill="#fff"></rect>
        <rect x="14" y="4" width="4" height="24" fill="#b92932"></rect>
        <rect
          x="14"
          y="1"
          width="4"
          height="30"
          transform="translate(32) rotate(90)"
          fill="#b92932"
        ></rect>
        <path
          d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z"
          fill="#b92932"
        ></path>
        <path
          d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z"
          fill="#b92932"
        ></path>
        <path
          d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
          opacity=".15"
        ></path>
        <path
          d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
          fill="#fff"
          opacity=".2"
        ></path>
      </svg>
    ),
    name: "EN",
  },
  pl: {
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="h-3 w-3"
      >
        <path
          d="M1,24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V15H1v9Z"
          fill="#cb2e40"
        ></path>
        <path
          d="M27,4H5c-2.209,0-4,1.791-4,4v8H31V8c0-2.209-1.791-4-4-4Z"
          fill="#fff"
        ></path>
        <path
          d="M5,28H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4ZM2,8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8Z"
          opacity=".15"
        ></path>
        <path
          d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
          fill="#fff"
          opacity=".2"
        ></path>
      </svg>
    ),
    name: "PL",
  },
  de: {
    flag: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="h-3 w-3"
      >
        <path fill="#cc2b1d" d="M1 11H31V21H1z"></path>
        <path d="M5,4H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z"></path>
        <path
          d="M5,20H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z"
          transform="rotate(180 16 24)"
          fill="#f8d147"
        ></path>
        <path
          d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
          opacity=".15"
        ></path>
        <path
          d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
          fill="#fff"
          opacity=".2"
        ></path>
      </svg>
    ),
    name: "DE",
  },
};

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
  className?: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  className,
}: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition(); // Remove 'isPending'
  const pathname = usePathname();
  const params = useParams();
  const [language, setLanguage] = React.useState<keyof typeof localeMap>(
    defaultValue as keyof typeof localeMap,
  );

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={`h-[20px]${className}`}>
        <Button
          variant="ghost"
          className="w-fit justify-between border-0 p-2 px-[0.36rem] text-zinc-800 focus-visible:ring-[none] md:gap-[0.12rem] lg:pl-3 lg:hover:bg-white"
        >
          <span className="flex items-center text-base tracking-wide lg:text-[0.95rem]">
            <span className="mb-1 mr-2 text-base lg:text-[0.95rem]">
              {localeMap[language].flag}
            </span>
            {localeMap[language].name}
          </span>
          <ChevronDown className="hidden h-4 w-4 opacity-50 xl:flex" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit pl-2 pt-0 md:pl-0 lg:pl-1">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const { value } = child.props;
            if (value === language) return null; // Hide current language
            return (
              <DropdownMenuItem
                key={value}
                onClick={() => {
                  setLanguage(value);
                  onSelectChange({
                    target: { value },
                  } as ChangeEvent<HTMLSelectElement>);
                }}
                className="cursor-pointer"
              >
                <span className="mb-1">{localeMap[value].flag}</span>
                <span className="flex-1 text-base tracking-wider">
                  {localeMap[value].name}
                </span>
                {language === value && (
                  <Check className="ml-auto h-4 w-4 opacity-50" />
                )}
              </DropdownMenuItem>
            );
          }
          return null;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
