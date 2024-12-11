import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Microscope,
  SwatchBook,
  Droplets,
  FlaskRoundIcon as Flask,
  Ruler,
} from "lucide-react";

export default function LabOffer() {
  return (
    <section className="px-4 py-12 md:px-6 lg:px-8">
      <h2 className="mb-8 text-center text-3xl font-bold">OFERTA</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Microscope className="h-6 w-6" />
              <CardTitle>Badania materiałów budowlanych</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Badania oryginalnych i wtórnych materiałów budowlanych umożliwiają
              określenie ich budowy, składu i właściwości (np. zaprawy murarskie
              i spoinujące, tynki, ceramika budowlana, kamień naturalny i
              sztuczny):
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Analiza makroskopowa</li>
              <li>
                Analiza mikroskopowa wraz z rejestracją obrazu mikroskopowego
              </li>
              <li>Analiza chemiczna</li>
              <li>
                Badanie właściwości kapilarnych (szybkość podciągania
                kapilarnego, nasiąkliwość wagowa)
              </li>
              <li>Badanie wytrzymałości mechanicznej</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <SwatchBook className="h-6 w-6" />
              <CardTitle>Badania warstw barwnych</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Stratygrafia warstw (przygotowanie przekrojów poprzecznych,
                analiza i rejestracja obrazu mikroskopowego)
              </li>
              <li>Identyfikacja pigmentów i barwników</li>
              <li>Identyfikacja spoiw</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Flask className="h-6 w-6" />
              <CardTitle>Badanie zasolenia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Określenie stopnia i rozkładu zasolenia oraz źródeł jego
              pochodzenia:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Analiza ilościowa</li>
              <li>Analiza jakościowa</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Droplets className="h-6 w-6" />

              <CardTitle>Badanie zawilgocenia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              Określenie stopnia i rozkładu zawilgocenia oraz przyczyn jego
              występowania.
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="mt-8 text-center text-muted-foreground">
        Stale współpracujemy ze specjalistami przeprowadzającymi badania
        instrumentalne komplementarne z analizami wykonanymi w laboratorium
        własnym (m.in. analiza petrograficzna, badania mikrobiologiczne).
      </p>
    </section>
  );
}
