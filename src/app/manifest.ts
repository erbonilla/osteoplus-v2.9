import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Osteóplus",
    short_name: "Osteóplus",
    description: "Reserva visitas y sigue tu recuperación con Osteóplus.",
    start_url: "/es",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f766e",
    icons: [
      {
        src: "/icons/favicon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icons/favicon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/logos/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
