"use client";

import { motion } from "framer-motion";

export function LinearBlurHero() {
  return (
    <main className="size-full bg-black flex flex-col items-center p-6 md:p-112 justify-center">
      <div className="max-w-screen-md">
        <Headline text="Linear is a purpose-built tool for planning and building products" />
        <motion.p
          className="text-white/70 text-balance text-[21px] leading-[28px] mt-6"
          initial={{ filter: "blur(12px)", opacity: 0, y: 24 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            bounce: 0,
            duration: 1.8,
            delay: 1,
          }}
        >
          Meet the system for modern product development.
          <br />
          Streamline issues, projects, and product roadmaps.
        </motion.p>
        <motion.button
          className="rounded-[10px] h-[40px] text-[15px] px-4 font-medium bg-[#e6e6e6] text-[#08090a] leading-none mt-12"
          initial={{ filter: "blur(12x)", opacity: 0, y: 16 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            bounce: 0,
            duration: 1.4,
            delay: 1.2,
          }}
        >
          Start building
        </motion.button>
      </div>
    </main>
  );
}

function Headline(props: { text: string }) {
  return (
    <p className="text-white text-[56px] leading-[61px] text-balance">
      {props.text.split(" ").map((word, index) => (
        <motion.span
          className="inline-block"
          key={word}
          initial={{ opacity: 0, filter: "blur(16px)", y: 8 + 1 * (index + 2) }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            delay: 0.04 * (index + 12),
            type: "spring",
            bounce: 0,
            duration: 0.7 + 0.1 * (index + 4),
          }}
        >
          {word}&#160;
        </motion.span>
      ))}
    </p>
  );
}
