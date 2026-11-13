import { Flex, Meta, Schema } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/resources";
import { HiddenGalleryCreator } from "./HiddenGalleryCreator"; // Import your creator modal

export async function generateMetadata() {
  const metadata = Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
  return { ...metadata, alternates: { canonical: metadata.openGraph.url } };
}

export default function Gallery() {
  return (
    <Flex maxWidth="l" direction="column">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      {/* This enables the triple-click "Gallery" navbar trigger and upload modal */}
      <HiddenGalleryCreator title={gallery.title} />

      {/* Your standard gallery layout */}
      <GalleryView />
    </Flex>
  );
}