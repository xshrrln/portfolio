"use client";

import React, { useState } from "react";
import { Media, Flex } from "@once-ui-system/core";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images,
  title,
}) => {
  const [orientations, setOrientations] = useState<
    Record<number, "portrait" | "landscape">
  >({});

  const handleImageLoad = (
    index: number,
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const orientation = naturalHeight > naturalWidth ? "portrait" : "landscape";
    setOrientations((prev) =>
      prev[index] === orientation ? prev : { ...prev, [index]: orientation }
    );
  };

  if (!images || images.length === 0) return null;

  const portraitIndices = images
    .map((_, idx) => idx)
    .filter((idx) => orientations[idx] === "portrait");

  const landscapeIndices = images
    .map((_, idx) => idx)
    .filter((idx) => orientations[idx] !== "portrait");

  return (
    <Flex
      direction="column"
      horizontal="center"
      gap="24"
      fillWidth
      marginY="24"
    >
      {/* Hidden preloader to detect natural image dimensions */}
      <div style={{ display: "none" }} aria-hidden="true">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt=""
            onLoad={(e) => handleImageLoad(idx, e)}
          />
        ))}
      </div>

      {/* Portrait Images (e.g., Higa mobile app screenshots): Side by side on both mobile & desktop */}
      {portraitIndices.length > 0 && (
        <Flex
          wrap
          horizontal="center"
          gap="16"
          fillWidth
        >
          {portraitIndices.map((idx) => (
            <div
              key={`${idx}-portrait`}
              style={{
                flex: "1 1 180px",
                maxWidth: "280px",
                minWidth: "140px",
              }}
            >
              <Media
                enlarge
                radius="m"
                src={images[idx]}
                alt={`${title} detail ${idx + 1}`}
                sizes="(max-width: 768px) 50vw, 280px"
              />
            </div>
          ))}
        </Flex>
      )}

      {/* Landscape / Horizontal Images (e.g., COT Inventory): Stacked vertically on separate lines */}
      {landscapeIndices.map((idx) => (
        <div
          key={`${idx}-landscape`}
          style={{
            width: "100%",
            maxWidth: "760px",
          }}
        >
          <Media
            enlarge
            radius="m"
            src={images[idx]}
            alt={`${title} detail ${idx + 1}`}
            sizes="(max-width: 768px) 100vw, 760px"
          />
        </div>
      ))}
    </Flex>
  );
};