import React from "react";
import { Card, CardContent } from "./ui/card";
import CustomButton from "./ui/custom-button";
import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import { SanityImageSource } from "@sanity/image-url/lib/types/types";
// import { PortableText, PortableTextBlock } from "@portabletext/react";
// import { portableTextComponents } from "@/lib/portableTextComponents";

export default function SingleProjectCard() {
  return (
    <Card className="border-none bg-zinc-100 px-6 pb-10 pt-16">
      <CardContent className="">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="">
            {/* <SectionTitle
                    label="WYBRANE REALIZACJE"
                    title="Projekt Bastion Wschodni we Fromborku"
                    textColor="black"
                    as="h2"
                    className="mb-10"
                  /> */}
            <h3 className="mb-10 max-w-[24rem] text-pretty font-bolder text-[1.9rem] leading-tight tracking-[-0.015em]">
              Projekt Bastion Wschodni we Fromborku
            </h3>
            {/* <PortableText
                    value={criteria}
                    components={portableTextComponents}
                  /> */}

            <div className="mb-4 max-w-[26rem] text-pretty text-[1.1rem]">
              Baszta Ferbera jest jednym z najbardziej oryginalnych elementów
              fortyfikacji Wzgórza Katedralnego we Fromborku. Nasz zespół podjął
              się zadania konserwacji budowli, której stan ze względu na
              destrukcję materiałów z których jest wzniesiona wykluczał jej
              użytkowanie. Przeprowadzone w 2024 roku prace przywróciły walory
              estetyczne budynku oraz znacznie poprawiły jego stan techniczny,
              umożliwiając dalsze prace mające na celu ewentualną jego adaptację
              do nowych funkcji.
            </div>

            <CustomButton animateOnView={false}>ZOBACZ PROJEKT</CustomButton>
          </div>
          <div className="relative h-full w-full">
            {/* <Image
                    src={imageUrl}
                    alt={imageAlt || "Header image"}
                    fill
                    style={{
                      objectFit: "cover", //
                      objectPosition: "center",
                    }}
                  /> */}

            <Image
              src={"/basteja.webp"}
              alt={
                // imageAlt ||
                "Header image"
              }
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
