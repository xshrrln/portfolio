"use client";

import React, { useEffect, useState } from "react";
import { Media, Text, Flex } from "@once-ui-system/core";
import { gallery } from "@/resources";

export default function GalleryView() {
  const [customItems, setCustomItems] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/gallery/items')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCustomItems(data);
        }
      })
      .catch((err) => console.error("Failed to load gallery items:", err));
  }, []);

  const formattedCustomImages = customItems.map((item) => ({
    src: item.image,
    alt: item.title,
    orientation: "vertical" as const,
  }));

  const allImages = [...formattedCustomImages, ...gallery.images];

  return (
    <Flex direction="column" gap="l">
      <Text variant="body-default-m" onBackground="neutral-weak" style={{ marginBottom: "0.5rem", lineHeight: "1.6" }}>
        A collection of my personal artworks—featuring graphic designs, traditional sketches using pens and graphite pencils, and pieces created with acrylic markers. All artworks are based on references from Pinterest and the internet.
      </Text>

      {/* 2-column grid on mobile/small screens, 4 columns on desktop, perfectly aligned tops */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          width: "100%",
        }}
        className="gallery-grid-responsive"
      >
        {allImages.map((image, index) => {
          const isHorizontal = image.orientation === "horizontal";
          return (
            <div
              key={index}
              style={{
                gridColumn: isHorizontal ? "span 4" : "span 1",
                width: "100%",
              }}
            >
              <Media
                enlarge
                priority={index < 10}
                sizes="(max-width: 560px) 50vw, 25vw"
                radius="m"
                aspectRatio={isHorizontal ? "16 / 9" : "3 / 4"}
                src={image.src}
                alt={image.alt}
              />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .gallery-grid-responsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .gallery-grid-responsive > div {
            grid-column: span 1 !important;
          }
          .gallery-grid-responsive > div:nth-child(odd) {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </Flex>
  );
}