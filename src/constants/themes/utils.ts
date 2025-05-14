import { allThemes } from '.';

export function getThemeOrThrow(themeId: string, numPairs: number) {
  const theme = allThemes.find(t => t.id === themeId);
  if (!theme) {
    throw new Error(`Unknown theme: ${themeId}`);
  }
  if (theme.values.length < numPairs) {
    throw new Error(
      `Theme "${theme.label}" does not support ${numPairs} pairs.`,
    );
  }
  return theme;
}
