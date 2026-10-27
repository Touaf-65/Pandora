"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Maximize, Minimize, Minus, Plus, RotateCcw } from "lucide-react";
import type { Artwork } from "@/lib/data/art";
import { ArtworkVisual } from "./ArtworkVisual";

const ZOOM_LEVELS = [1, 1.5, 2, 3];

type ViewerArtwork = Pick<Artwork, "id" | "title" | "ratio" | "palette" | "artist">;

/** Zoom, pan by dragging, and full screen. */
export function ArtworkViewer({ artwork }: { artwork: ViewerArtwork }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [level, setLevel] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [fullscreen, setFullscreen] = useState(false);
  const zoom = ZOOM_LEVELS[level];

  // Leaving native full screen (Esc) also closes the window-filling view.
  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) setFullscreen(false);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Esc closes the view when the browser refused native full screen.
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  const setZoomLevel = (next: number) => {
    setLevel(next);
    if (ZOOM_LEVELS[next] === 1) setOffset({ x: 0, y: 0 });
  };

  /**
   * The viewer always fills the window; native full screen is requested on top
   * when the browser allows it (embedded browsers and some mobiles refuse it).
   */
  const toggleFullscreen = () => {
    if (fullscreen) {
      setFullscreen(false);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    } else {
      setFullscreen(true);
      stageRef.current?.requestFullscreen?.().catch(() => {});
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    if (zoom === 1) return;
    drag.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!drag.current) return;
    setOffset({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y });
  };
  const endDrag = () => {
    drag.current = null;
  };

  const control = "flex size-10 items-center justify-center rounded-lg text-ink hover:bg-white disabled:opacity-40";

  return (
    <div
      ref={stageRef}
      role={fullscreen ? "dialog" : undefined}
      aria-modal={fullscreen || undefined}
      aria-label={fullscreen ? `${artwork.title}, plein écran` : undefined}
      className={`flex items-center justify-center overflow-hidden bg-surface-muted ${
        fullscreen ? "fixed inset-0 z-50" : "relative h-[34rem] rounded-card"
      }`}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`flex h-full w-full touch-none items-center justify-center p-10 ${
          zoom > 1 ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        {/* Sized against the available box (container units) so any aspect ratio fits without cropping. */}
        <div className="flex h-full w-full items-center justify-center" style={{ containerType: "size" }}>
          <div
            className="shadow-xl transition-transform duration-200 ease-out"
            style={{
              width: `min(100cqw, calc(100cqh * ${artwork.ratio[0]} / ${artwork.ratio[1]}))`,
              aspectRatio: `${artwork.ratio[0]} / ${artwork.ratio[1]}`,
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            }}
          >
            <ArtworkVisual artwork={artwork} className="h-full w-full" />
          </div>
        </div>
      </div>

      <p className="glass absolute top-4 left-4 rounded-lg px-3 py-1.5 text-xs text-muted">
        Aperçu provisoire · © {artwork.artist.name}
      </p>

      <div role="toolbar" aria-label="Affichage de l’œuvre" className="glass-strong absolute right-4 bottom-4 flex items-center gap-1 rounded-xl p-1">
        <button type="button" aria-label="Dézoomer" disabled={level === 0} onClick={() => setZoomLevel(level - 1)} className={control}>
          <Minus className="size-4" aria-hidden />
        </button>
        <span className="min-w-14 text-center text-sm font-semibold tabular-nums" aria-live="polite">
          {Math.round(zoom * 100)} %
        </span>
        <button
          type="button"
          aria-label="Zoomer"
          disabled={level === ZOOM_LEVELS.length - 1}
          onClick={() => setZoomLevel(level + 1)}
          className={control}
        >
          <Plus className="size-4" aria-hidden />
        </button>
        <button type="button" aria-label="Réinitialiser l’affichage" disabled={level === 0} onClick={() => setZoomLevel(0)} className={control}>
          <RotateCcw className="size-4" aria-hidden />
        </button>
        <button type="button" aria-label={fullscreen ? "Quitter le plein écran" : "Plein écran"} onClick={toggleFullscreen} className={control}>
          {fullscreen ? <Minimize className="size-4" aria-hidden /> : <Maximize className="size-4" aria-hidden />}
        </button>
      </div>

      {zoom > 1 && (
        <p className="glass absolute bottom-4 left-4 hidden rounded-lg px-3 py-1.5 text-xs text-muted sm:block">
          Faites glisser pour explorer les détails
        </p>
      )}
    </div>
  );
}
