"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const [language, setLanguage] = React.useState(defaultValue);
  const t = useTranslations("locale-switcher");

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
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-40 justify-between">
          <span className="flex items-center">
            <span className="mr-2 text-lg">{t(`locale.${language}.flag`)}</span>
            {t(`locale.${language}.name`)}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
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
                <span className="mr-2 text-lg">
                  {t(`locale.${value}.flag`)}
                </span>
                <span className="flex-1">{t(`locale.${value}.name`)}</span>
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
