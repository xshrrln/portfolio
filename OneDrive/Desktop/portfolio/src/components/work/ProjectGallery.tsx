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

  return (
    <Flex
      direction="column"
      horizontal="center"
      gap="16"
      fillWidth
      marginY="24"
    >
      {/* Hidden preloader to detect natural image aspect ratios */}
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

      {/* Keeps all images side by side on both desktop and mobile viewports */}
      <Flex
        wrap
        horizontal="center"
        gap="12"
        fillWidth
      >
        {images.map((src, idx) => {
          const isPortrait = orientations[idx] === "portrait";
          return (
            <div
              key={`${idx}-image`}
              style={{
                flex: "1 1 140px",
                maxWidth: isPortrait ? "240px" : "480px",
                minWidth: "120px",
              }}
            >
              <Media
                enlarge
                radius="m"
                aspectRatio={isPortrait ? "9 / 16" : "16 / 9"}
                src={src}
                alt={`${title} detail ${idx + 1}`}
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
          );
        })}
      </Flex>
    </Flex>
  );
};