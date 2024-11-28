import { Card, CardContent } from "@/components/ui/card";
import {
  History,
  ClipboardCheck,
  Hammer,
  PenTool,
  Star,
  BookOpen,
  Building,
  Archive,
  FileSearch,
  Ruler,
  PaintBucket,
  Compass,
  Wrench,
  Award,
  Bookmark,
  Library,
  ScrollText,
  Glasses,
} from "lucide-react";

const cardData = [
  { icons: [History, Building, Archive], text: "Rys historyczny" },
  { icons: [ClipboardCheck, FileSearch, Ruler], text: "Stan zachowania" },
  { icons: [Hammer, PaintBucket, Compass], text: "Założenia konserwatorskie" },
  {
    icons: [Wrench, PenTool],
    text: "Przebieg prac konserwatorskich i restauratorskich oraz budowlanych",
  },
  {
    icons: [Star, Award, Building],
    text: "Efekty prac konserwatorskich i restauratorskich oraz budowlanych",
  },
  { icons: [BookOpen, Library, ScrollText], text: "Wybrana bibliografia" },
];

export default function ConservationCIcons() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {cardData.map((card, index) => (
        <Card
          key={index}
          className="flex flex-col items-center p-6 transition-shadow hover:shadow-lg"
        >
          <CardContent className="flex flex-col items-center text-center">
            <div className="mb-4 flex justify-center space-x-4">
              {card.icons.map((Icon, iconIndex) => (
                <Icon key={iconIndex} className="h-8 w-8 text-primary" />
              ))}
            </div>
            <h3 className="text-lg font-semibold">{card.text}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
