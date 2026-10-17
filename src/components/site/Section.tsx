"use client";

import { motion } from "motion/react";
import { Fragment, type ReactNode } from "react";

/**
 * Nadpis z administrace.
 *
 * Nový řádek se zalomí, nic víc. Nadpisy jsou jednobarevné; hvězdičky,
 * kterými se dřív značilo oranžové zvýraznění, se jen zahodí, aby je
 * starší uložený text neukázal na webu.
 */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, li, lines) => (
        <Fragment key={li}>
          {line.replaceAll("*", "")}
          {li < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

/** Nadpis sekce s volitelným podtitulem. */
export function SectionHeading({
  title,
  lead,
  align = "left",
  light = false,
}: {
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <h2
        className={`text-[2rem] font-bold leading-[1.05] sm:text-[2.6rem] md:text-[3rem] ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {typeof title === "string" ? <RichText text={title} /> : title}
      </h2>
      {lead && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-cream/75" : "text-ink-2"}`}>{lead}</p>
      )}
    </Reveal>
  );
}

/** Element, který se při najetí do viewportu vynoří. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  id?: string;
}) {
  const Tag = motion[as];
  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1], delay }}
    >
      {children}
    </Tag>
  );
}
