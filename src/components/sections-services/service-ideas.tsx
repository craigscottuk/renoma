import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Microscope,
  ClipboardList,
  Eye,
  Paintbrush,
  HardHat,
  FileSpreadsheet,
  FlaskRoundIcon as Flask,
  Building,
  Search,
  FileText,
  Compass,
  Brush,
  Hammer,
  FileCheck,
  TestTube,
  Landmark,
  Scale,
  PenTool,
  Users,
  Ruler,
  Wrench,
  Briefcase,
  Beaker,
  History,
  BrickWall,
  Drill,
  Church,
  HandCoins,
  FolderOpen,
  Calendar,
  CalendarCheck,
  CalendarCheck2,
} from "lucide-react";

const services = [
  {
    title: "Conservation Studies and Expert Analyses",
    icons: [FolderOpen, Search],
  },
  {
    title: "Conservation Work Programs",
    icons: [ClipboardList, CalendarCheck2],
  },
  {
    title: "Conservation Supervision and Consultations",
    icons: [Eye, Users],
  },
  {
    title: "Conservation and Restoration Work",
    icons: [Brush, Hammer],
  },
  {
    title: "Construction Work in Historic Buildings",
    icons: [HardHat, BrickWall],
  },
  {
    title: "Administrative Support and Grant Acquisition",
    icons: [FileCheck, HandCoins],
  },
  {
    title: "RenomaLAB – Conservation Research Laboratory",
    icons: [Microscope, Flask],
  },
  {
    title: "Revitalization of Historic Buildings",
    icons: [Landmark, Church],
  },
];

export default function ConservationServices() {
  return (
    <div className="container mx-auto py-12">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Our Conservation Services
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="mb-4 flex justify-center space-x-3">
                {service.icons.map((Icon, iconIndex) => (
                  <div
                    key={iconIndex}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                ))}
              </div>
              <CardTitle className="text-center text-lg">
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-center text-muted-foreground">
                Specialized services in {service.title.toLowerCase()}.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
