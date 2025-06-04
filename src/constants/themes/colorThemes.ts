import { TileTheme } from '../../state/gameSettingsAtom';

const CLASSIC = [
  '#809B9E',
  '#A937A0',
  '#976EB4',
  '#043034',
  '#376DB9',
  '#C95A4F',
  '#0FCBDD',
  '#DEE3FD',
  '#3BC5C9',
  '#CBA172',
  '#2C87EE',
  '#0E59AE',
  '#2D8630',
  '#9DD968',
  '#CBE1FB',
  '#052242',
  '#7B966F',
  '#181D16',
  '#CE8673',
  '#52654A',
  '#43AD59',
  '#E4E9E2',
  '#287A8F',
  '#D25B7E',
  '#743ACB',
  '#7D2B47',
  '#E32B2B',
  '#F1C6CA',
  '#DD88D4',
  '#F0EBCB',
  '#CBDBBD',
  '#9351C2',
];

const RETRO = [
  '#ff007c', // neon pink
  '#ff2a2a', // red-orange
  '#ff6600', // retro orange
  '#ffaa00', // gold
  '#ffee00', // yellow
  '#ccff00', // acid green
  '#66ff00', // neon green
  '#00ff66', // seafoam
  '#00ffaa', // cyan
  '#00ffee', // electric blue
  '#00ccff', // sky blue
  '#0099ff', // bright blue
  '#0044ff', // outrun blue
  '#2200ff', // pure blue
  '#5500ff', // deep blue violet
  '#8000ff', // electric violet
  '#a600ff', // neon purple
  '#cc00ff', // pink-purple
  '#ff00cc', // magenta
  '#ff00aa', // hot pink
  '#ff3399', // bright pink
  '#ff6699', // pastel rose
  '#ff99cc', // cotton candy pink
  '#660033', // mulberry
  '#330033', // dark magenta
  '#1a0033', // deep purple
  '#0d0026', // almost black purple
  '#1a1a40', // VHS navy
  '#2c2c54', // dusk blue
  '#3a0ca3', // retro indigo
  '#7209b7', // synthwave violet
  '#f72585', // retina pink
];

const GARDIENT_BLUEBERRY_PINK = [
  '#292f56',
  '#2f315a',
  '#35335f',
  '#3c3563',
  '#433767',
  '#49396b',
  '#503b6e',
  '#573c71',
  '#5f3e74',
  '#663f77',
  '#6e417a',
  '#75427c',
  '#7d437e',
  '#844580',
  '#8c4681',
  '#934782',
  '#9b4983',
  '#a24a83',
  '#aa4c84',
  '#b14d84',
  '#b84f83',
  '#bf5183',
  '#c65382',
  '#cd5581',
  '#d4577f',
  '#da5a7e',
  '#e05d7c',
  '#e6607a',
  '#eb6478',
  '#f06875',
  '#f56c73',
  '#fa7070',
];

const GRADIENT_RED_BLUE = [
  '#ff0505',
  '#f8050d',
  '#f10515',
  '#ea051d',
  '#e20425',
  '#db042d',
  '#d40434',
  '#cd043c',
  '#c60444',
  '#bf044c',
  '#b70354',
  '#b0035c',
  '#a90364',
  '#a2036c',
  '#9b0374',
  '#94037c',
  '#8c0283',
  '#85028b',
  '#7e0293',
  '#77029b',
  '#7002a3',
  '#6902ab',
  '#6101b3',
  '#5a01bb',
  '#5301c3',
  '#4c01cb',
  '#4501d2',
  '#3e01da',
  '#3600e2',
  '#2f00ea',
  '#2800f2',
  '#2100fa',
];

export const colorThemes: TileTheme[] = [
  {
    id: idPrefix('classic'),
    label: 'classic',
    type: 'color',
    values: CLASSIC,
  },
  {
    id: idPrefix('retro'),
    label: 'retro',
    type: 'color',
    values: RETRO,
  },
  {
    id: idPrefix('gradient_1'),
    label: 'gradient 1',
    type: 'color',
    values: GRADIENT_RED_BLUE,
  },
  {
    id: idPrefix('gradient_2'),
    label: 'gradient 2',
    type: 'color',
    values: GARDIENT_BLUEBERRY_PINK,
  },
];

function idPrefix(id: string) {
  return `color_${id}`;
}
