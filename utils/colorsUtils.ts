const palette = ['#007BFF', '#32CD32', '#FFA500', '#6A5ACD', '#FF69B4', '#20B2AA'];

export const getRandomColorFromPalette = (seed = ''): string => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % palette.length;
  return palette[index];
};
