
/// <reference types="vite/client" />

// Instagram embed API type declaration
interface InstagramEmbed {
  Embeds: {
    process: () => void;
  };
}

interface Window {
  instgrm?: InstagramEmbed;
}
