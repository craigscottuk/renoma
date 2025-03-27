"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useSelectedLayoutSegment } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/socials";
import { useNavItems } from "@/lib/navItems";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  socialMediaLinks: {
    facebook: string;
    instagram: string;
    linkedIn: string;
  };
}

export function MobileNav({
  isOpen,
  onClose,
  socialMediaLinks,
}: MobileNavProps) {
  const navItems = useNavItems();
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const currentPath = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[190] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Side navigation */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-y-0 right-0 z-[200] w-full max-w-xs bg-zinc-900 shadow-xl"
          >
            <div className="flex h-full flex-col overflow-y-auto overscroll-contain">
              <div className="flex items-center justify-end border-zinc-800 px-4 pt-5">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="px-1 pb-1 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                  aria-label="Close menu"
                >
                  <X className="min-h-6 min-w-6" />
                </Button>
              </div>

              <nav className="flex-1 px-0 pb-8 pt-2">
                <ul className="flex flex-col space-y-1">
                  {navItems.map((item, i) => {
                    const isActive = currentPath === item.link;
                    return (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{
                          duration: 0.2,
                          delay: i * 0.08,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={item.link}
                          className={cn(
                            "group flex w-full items-center rounded-lg py-4 pl-8 text-[1.1rem] transition-all hover:bg-zinc-800",
                            isActive
                              ? "bg-gradient-to-r from-[#5d4a1f] via-[#9f7928] to-[#D1B464] pl-10 font-regular text-zinc-200"
                              : "text-zinc-100",
                          )}
                          onClick={onClose}
                        >
                          <span>{item.label}</span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-zinc-700 pb-10 pl-8 pt-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-6">
                    <a
                      href={socialMediaLinks.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon className="min-h-5 min-w-5 fill-zinc-300" />
                    </a>
                    <a
                      href={socialMediaLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <FacebookIcon className="min-h-5 min-w-5 fill-zinc-300" />
                    </a>
                    <a
                      href={socialMediaLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="min-h-5 min-w-5 fill-zinc-300" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
