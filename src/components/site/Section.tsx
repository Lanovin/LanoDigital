"use client";

import { motion } from "motion/react";
import { Fragment, type ReactNode } from "react";

/**
 * Nadpis z administrace.
 *
 * Text mezi hvězdičkami se zvýrazní oranžově a nový řádek se zalomí.
 * Schválně nic víc: čím míň značek, tím míň se dá v administraci pokazit,
 * a všechno ostatní je záležitost stylů, ne textu.
 */
export function RichText({ text, highlight = "text-rust" }: { text: string; highlight?: string }) {
  return (
    <>
      {text.split("\n").map((line, li, lines) => (
        <Fragment key={li}>
          {line.split("*").map((part, i) =>
            i % 2 === 1 ? (
              <span key={i} className={highlight}>
                {part}
              </span>
            ) : (
              <Fragment key={i}>{part}</Fragment>
            ),
          )}
          {li < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

/** Nadpis sekce se štítkem a volitelným podtitulem. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${light ? "!text-paper" : ""}`}>{eyebrow}</p>}
      <h2
        className={`mt-3 text-[2rem] font-bold leading-[1.05] sm:text-[2.6rem] md:text-[3rem] ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {typeof title === "string" ? <RichText text={title} highlight={light ? "text-paper" : "text-rust"} /> : title}
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
