"use client";

import {
  AvatarGroup,
  Column,
  Flex,
  Heading,
  Text,
  SmartLink,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  hasContent: boolean;
  description: string;
  avatars: { src: string; "aria-label"?: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  hasContent,
  description,
  avatars,
  link,
}) => {
  // Use the first image as a clean cover preview for this specific project card
  const coverImage = images.length > 0 ? images[0] : null;

  return (
    <Column fillWidth gap="m">
      {coverImage && (
        <SmartLink href={href} style={{ width: "100%", display: "block" }}>
          <div
            style={{
              width: "100%",
              height: "320px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "12px",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            }}
          >
            <img
              src={coverImage}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Keeps the card preview neat and uniform
                display: "block",
              }}
            />
          </div>
        </SmartLink>
      )}

      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <SmartLink href={href}>
              <Heading as="h2" wrap="balance" variant="heading-strong-xl">
                {title}
              </Heading>
            </SmartLink>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || hasContent) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
          </Column>
        )}
      </Flex>
    </Column>
  );
};