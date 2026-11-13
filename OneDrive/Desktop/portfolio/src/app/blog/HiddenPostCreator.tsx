"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, Heading, Text } from "@once-ui-system/core";

interface HiddenPostCreatorProps {
  title: string;
}

export const HiddenPostCreator: React.FC<HiddenPostCreatorProps> = ({
  title,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clickCountRef = useRef(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Triple-click "Blog" navbar trigger
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const blogLink = target.closest('a[href="/blog"], a[href^="/blog"]');

      if (blogLink) {
        clickCountRef.current += 1;

        if (resetTimerRef.current) {
          clearTimeout(resetTimerRef.current);
        }

        if (clickCountRef.current >= 3) {
          e.preventDefault();
          clickCountRef.current = 0;
          setIsModalOpen(true);
        } else {
          resetTimerRef.current = setTimeout(() => {
            clickCountRef.current = 0;
          }, 1500);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", postTitle);
    formData.append("summary", summary);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await fetch("/api/blog/create", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Post published successfully!");
        setPostTitle("");
        setSummary("");
        setContent("");
        setImageFile(null);
        setIsModalOpen(false);
        window.location.reload(); // Refresh to show the new post
      } else {
        alert("Failed to publish post.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while publishing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {title}
      </Heading>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--neutral-background-strong, #161616)",
              padding: "24px",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "520px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.12)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                width: "100%",
              }}
            >
              <Heading variant="heading-strong-l">Create Post</Heading>
              <Button
                variant="tertiary"
                size="s"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </Button>
            </div>

            <form
              onSubmit={handleCreatePost}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div>
                <Text variant="label-default-s" marginBottom="4">
                  Title
                </Text>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="What's on your mind?"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.04)",
                    color: "inherit",
                  }}
                />
              </div>

              <div>
                <Text variant="label-default-s" marginBottom="4">
                  Summary
                </Text>
                <input
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Short description..."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.04)",
                    color: "inherit",
                  }}
                />
              </div>

              <div>
                <Text variant="label-default-s" marginBottom="4">
                  Attach Thumbnail / Feature Image
                </Text>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.04)",
                    color: "inherit",
                  }}
                />
              </div>

              <div>
                <Text variant="label-default-s" marginBottom="4">
                  Content (Markdown)
                </Text>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content..."
                  rows={6}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.04)",
                    color: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "8px",
                  width: "100%",
                }}
              >
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Publishing..." : "Publish Post"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};