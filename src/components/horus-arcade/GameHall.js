import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { GAMES, SHELVES } from "./games";

const TABS = [{ id: "all", label: "All games" }, ...SHELVES];

// Front: the game's arcade cabinet under its neon sign. Back: Horus playing
// it, with the tagline and how to play. Hover flips it on desktop; on touch
// (and with the keyboard) the card is a toggle button.
function Cabinet({ game, index, reduce }) {
  const [flipped, setFlipped] = useState(false);
  const shelf = SHELVES.find(({ id }) => id === game.shelf)?.label;

  return (
    <motion.li
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.4,
        delay: reduce ? 0 : Math.min(index, 12) * 0.03,
      }}
      id={`game-${game.id}`}
      className="h-full list-none"
    >
      <button
        type="button"
        onClick={() => setFlipped((value) => !value)}
        aria-pressed={flipped}
        aria-label={`${game.name}: ${game.tagline}. ${game.howTo}`}
        className={`ha-cab group block h-full w-full ${flipped ? "is-flipped" : ""}`}
        style={{ "--accent": game.accent }}
      >
        <span className="ha-cab-inner">
          <span className="ha-cab-face ha-cab-front">
            <span className="ha-cab-sign">
              <Image
                src={`/images/horus-arcade/games/${game.id}/sign.webp`}
                alt={`${game.name} neon sign`}
                width={800}
                height={229}
                sizes="(max-width: 639px) 45vw, 240px"
                className="h-auto w-full"
              />
            </span>
            <Image
              src={`/images/horus-arcade/games/${game.id}/cabinet.webp`}
              alt={`${game.name} arcade cabinet`}
              width={374}
              height={600}
              sizes="(max-width: 639px) 40vw, 200px"
              className="ha-cab-art mx-auto aspect-[5/8] w-[78%] object-contain"
            />
            <span className="ha-cab-name ha-display">{game.name}</span>
          </span>
          <span className="ha-cab-face ha-cab-back">
            <Image
              src={`/images/horus-arcade/games/${game.id}/play.webp`}
              alt={`Horus the falcon playing ${game.name}`}
              width={720}
              height={480}
              sizes="(max-width: 639px) 45vw, 260px"
              className="ha-cab-play aspect-[3/2] w-full shrink-0 rounded-xl object-contain"
            />
            <span className="ha-chip mt-3 self-start">{shelf}</span>
            <span className="ha-display mt-2 text-xl leading-tight text-white">
              {game.name}
            </span>
            <span className="mt-1 text-sm font-bold text-[color:var(--accent)]">
              {game.tagline}
            </span>
            <span className="ha-cab-howto mt-2 text-sm leading-snug text-[color:var(--ha-text)]">
              {game.howTo}
            </span>
          </span>
        </span>
      </button>
    </motion.li>
  );
}

export default function GameHall() {
  const [shelf, setShelf] = useState("all");
  const reduce = useReducedMotion();
  const games =
    shelf === "all" ? GAMES : GAMES.filter((game) => game.shelf === shelf);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Game shelves"
        className="ha-tabs mx-auto flex max-w-full gap-2 overflow-x-auto pb-2"
      >
        {TABS.map((tab) => {
          const count =
            tab.id === "all"
              ? GAMES.length
              : GAMES.filter((game) => game.shelf === tab.id).length;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={shelf === tab.id}
              onClick={() => setShelf(tab.id)}
              className="ha-tab relative shrink-0 rounded-full px-5 py-2.5 text-sm font-extrabold"
            >
              {shelf === tab.id && (
                <motion.span
                  layoutId="ha-tab-pill"
                  className="ha-tab-pill absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">
                {tab.label} <span className="opacity-60">{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul
        layout={!reduce}
        className="mt-8 grid grid-cols-5 gap-5 p-0 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 sm:gap-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {games.map((game, index) => (
            <Cabinet key={game.id} game={game} index={index} reduce={reduce} />
          ))}
        </AnimatePresence>
      </motion.ul>
      <p className="mt-5 text-center text-sm text-[color:var(--ha-muted)]">
        Hover or tap a cabinet to see how it plays.
      </p>
    </div>
  );
}
