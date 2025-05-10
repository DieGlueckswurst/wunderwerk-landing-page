
// This is a utility to handle placeholder images if real ones aren't available yet
export const getPlaceholderImage = (index: number) => {
  const placeholderImages = [
    "https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=1600&h=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=1600&h=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1600&h=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1600&h=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1600&h=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&h=900&auto=format&fit=crop"
  ];
  
  return placeholderImages[index % placeholderImages.length];
};
