"use client";

import React, { useState } from "react";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        width: "100%",
        margin: "2rem 0",
      }}
    >
      {/* Portrait Images: Side by side in a single row with a small gap */}
      {portraitIndices.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            overflowX: "auto",
          }}
        >
          {portraitIndices.map((idx) => (
            <div
              key={`${idx}-portrait`}
              style={{
                flex: portraitIndices.length > 1 ? "1 1 0%" : "0 1 320px",
                minWidth: 0,
                maxWidth: portraitIndices.length > 1 ? "220px" : "320px",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={images[idx]}
                alt={`${title} detail ${idx + 1}`}
                onLoad={(e) => handleImageLoad(idx, e)}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "380px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Landscape / Wide Images: Stacked vertically on their own separate lines */}
      {landscapeIndices.map((idx) => (
        <div
          key={`${idx}-landscape`}
          style={{
            width: "100%",
            maxWidth: "760px",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "rgba(0, 0, 0, 0.03)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={images[idx]}
            alt={`${title} detail ${idx + 1}`}
            onLoad={(e) => handleImageLoad(idx, e)}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  );
};