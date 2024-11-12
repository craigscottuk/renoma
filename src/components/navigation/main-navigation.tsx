// cSpell:disable

import NavigationLinkItem from "./navigation-link-item";
import { useNavItems } from "@/lib/navItems";

export default function MainNavigation() {
  const navItems = useNavItems();

  return (
    <nav className="flex items-end">
      {navItems.map((item, index) => (
        <NavigationLinkItem
          className="hidden text-base xl:mx-3.5 xl:flex"
          key={index}
          href={item.link}
        >
          {item.label}
        </NavigationLinkItem>
      ))}
    </nav>
  );
}
