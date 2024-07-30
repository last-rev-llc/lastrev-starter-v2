import { Theme, ThemeOptions } from '@mui/material/styles';

type ThemeModule = {
  [key: string]: (theme: Theme) => ThemeOptions;
};

function importAll(r: __WebpackModuleApi.RequireContext): ThemeModule[] {
  return r.keys().map((fileName: string) => {
    const themeName = fileName.replace('./', '').replace('.theme.ts', '');
    return { [themeName]: r(fileName).default };
  });
}

const themesArray: ThemeModule[] = importAll(require.context('../', true, /\.theme\.ts$/));

const themes: ThemeModule = themesArray.reduce<ThemeModule>((acc, current) => {
  return { ...acc, ...current };
}, {});

export default themes;
