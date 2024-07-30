export const getVideoEmbedUrl = (assetUrl: string) => {
  if (typeof assetUrl !== 'string') {
    return null;
  }

  if (assetUrl?.includes('youtu.be/')) {
    const vidId = assetUrl?.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${vidId}`;
  }

  // https://www.youtube.com/watch?v=xxxxxx
  if (assetUrl?.includes('youtube.com/watch?v=')) {
    const vidId = assetUrl?.split('youtube.com/watch?v=')[1];
    return `https://www.youtube.com/embed/${vidId}`;
  }

  // https://player.vimeo.com/video/xxxxxx
  if (assetUrl?.includes('https://player.vimeo.com/video/')) {
    return assetUrl;
  }

  // https://vimeo.com/xxxxxx
  if (assetUrl?.includes('vimeo.com/')) {
    const vidId = assetUrl?.split('vimeo.com/')[1];
    return `https://player.vimeo.com/video/${vidId}`;
  }

  // https://www.facebook.com/photo.php?v=xxxxxx
  if (assetUrl?.includes('facebook.com/photo.php?v=')) {
    const vidId = assetUrl?.split('facebook.com/photo.php?v=')[1];
    return `https://www.facebook.com/video/${vidId}`;
  }

  // https://www.facebook.com/video/video.php?v=xxxxxx
  if (assetUrl?.includes('facebook.com/video/video.php?v=')) {
    const vidId = assetUrl?.split('facebook.com/video/video.php?v=')[1];
    return `https://www.facebook.com/video/${vidId}`;
  }
  return null;
};

export const getThumbnailURL = (assetUrl: string) => {
  if (typeof assetUrl !== 'string') {
    return null;
  }
  if (assetUrl?.includes('youtu.be/')) {
    const vidId = assetUrl?.split('youtu.be/')[1];
    return `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
  }
  //https://www.youtube.com/watch?v=xxxxxx
  if (assetUrl?.includes('youtube.com/watch?v=')) {
    const vidId = assetUrl?.split('youtube.com/watch?v=')[1];
    return `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`;
  }
  //https://vimeo.com/xxxxxx
  if (assetUrl?.includes('vimeo.com/')) {
    const vidId = assetUrl?.split('vimeo.com/')[1];
    return `https://i.vimeocdn.com/video/${vidId}_640.jpg`;
  }
  //https://www.facebook.com/photo.php?v=xxxxxx
  if (assetUrl?.includes('facebook.com/photo.php?v=')) {
    const vidId = assetUrl?.split('facebook.com/photo.php?v=')[1];
    return `https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/${vidId}.jpg`;
  }
  //https://www.facebook.com/video/video.php?v=xxxxxx
  if (assetUrl?.includes('facebook.com/video/video.php?v=')) {
    const vidId = assetUrl?.split('facebook.com/video/video.php?v=')[1];
    return `https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/${vidId}.jpg`;
  }
  return null;
};
