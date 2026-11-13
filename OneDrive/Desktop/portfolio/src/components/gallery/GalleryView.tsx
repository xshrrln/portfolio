"use client";

import React, { useEffect, useState } from "react";
import { Media, MasonryGrid, Text, Flex } from "@once-ui-system/core";
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
      {/* Intro text explaining your artworks and references */}
      <Text variant="body-default-m" onBackground="neutral-weak" style={{ marginBottom: "0.5rem", lineHeight: "1.6" }}>
        A collection of my personal artworks—featuring graphic designs, traditional sketches using pens and graphite pencils, and pieces created with acrylic markers. All artworks are based on references from Pinterest and the internet.
      </Text>

      {/* 4-column gallery grid */}
      <MasonryGrid columns={4} s={{ columns: 2 }}>
        {allImages.map((image, index) => (
          <Media
            enlarge
            priority={index < 10}
            sizes="(max-width: 560px) 50vw, 25vw"
            key={index}
            radius="m"
            aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </MasonryGrid>
    </Flex>
  );
}