"use client";

interface Props {
  modelId: string;
  title: string;
  className?: string;
  autostart?: boolean;
  transparent?: boolean;
  ui_infos?: boolean;
  ui_controls?: boolean;
  autospin?: number;
  animation_autoplay?: boolean;
}

export default function SketchfabEmbed({
  modelId,
  title,
  className = "",
  autostart = true,
  transparent = true,
  ui_infos = false,
  ui_controls = false,
  autospin,
  animation_autoplay = true,
}: Props) {
  const params = new URLSearchParams({
    autostart:          autostart   ? "1" : "0",
    transparent:        transparent ? "1" : "0",
    ui_infos:           "0",
    ui_controls:        ui_controls ? "1" : "0",
    ui_watermark:       "0",
    ui_watermark_link:  "0",
    ui_logo:            "0",
    ui_ar:              "0",
    ui_help:            "0",
    ui_settings:        "0",
    ui_vr:              "0",
    ui_fullscreen:      "0",
    ui_annotations:     "0",
    ui_stop:            "0",
    ui_inspector:       "0",
    ui_loading:         "0",
    ui_hint:            "0",
    camera:             "0",
    preload:            "1",
    dnt:                "0",
    animation_autoplay: animation_autoplay ? "1" : "0",
    scrollwheel:        "0",
  });

  if (autospin !== undefined) params.set("autospin", String(autospin));

  return (
    <iframe
      title={title}
      src={`https://sketchfab.com/models/${modelId}/embed?${params.toString()}`}
      width="100%"
      height="100%"
      className={className}
      frameBorder="0"
      allowFullScreen
      allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; gyroscope; magnetometer"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        background: "transparent",
        display: "block",
      }}
    />
  );
}
