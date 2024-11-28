"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Expand } from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

interface BeforeAfterProps {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  title: string
}

export function BeforeAfter({ beforeImage, afterImage, beforeAlt, afterAlt, title }: BeforeAfterProps) {
  const [isHovering, setIsHovering] = React.useState(false)

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold text-center mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            className="relative aspect-[4/3]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <Image
              src={beforeImage}
              alt={beforeAlt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <Image
              src={afterImage}
              alt={afterAlt}
              layout="fill"
              objectFit="cover"
              className={`rounded-lg transition-opacity duration-300 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
            />
            <Dialog>
              <DialogTrigger asChild>
                <button className="absolute bottom-2 right-2 bg-white/80 p-2 rounded-full shadow-md">
                  <Expand className="w-4 h-4" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Image
                      src={beforeImage}
                      alt={beforeAlt}
                      width={600}
                      height={450}
                      className="rounded-lg"
                    />
                    <p className="text-center font-medium mt-2">Przed</p>
                  </div>
                  <div>
                    <Image
                      src={afterImage}
                      alt={afterAlt}
                      width={600}
                      height={450}
                      className="rounded-lg"
                    />
                    <p className="text-center font-medium mt-2">Po</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
          <div className="space-y-2">
            <p className="font-medium">Opis zmian:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Odnowiona elewacja</li>
              <li>Zrekonstruowane detale architektoniczne</li>
              <li>Wzmocniona struktura budynku</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

