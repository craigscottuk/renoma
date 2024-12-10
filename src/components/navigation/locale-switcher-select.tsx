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
const localeMap: Record<string, { flag: string; name: string }> = {
  en: { flag: "🇬🇧", name: "EN" },
  pl: { flag: "🇵🇱", name: "PL" },
  de: { flag: "🇩🇪", name: "DE" },
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
      <DropdownMenuTrigger asChild className={`h-[20px] py-0 ${className}`}>
        <Button
          variant="ghost"
          className="w-fit justify-between border-0 text-black hover:bg-white focus-visible:ring-[none]"
        >
          <span className="flex items-center text-base tracking-wide">
            <span className="mr-2 text-base">{localeMap[language].flag}</span>
            {localeMap[language].name}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const { value } = child.props;
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
                <span className="mr-2 text-base">{localeMap[value].flag}</span>
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
