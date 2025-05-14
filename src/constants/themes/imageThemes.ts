import { TileTheme } from '../../state/gameSettingsAtom';

const path = '/themes/images';

const MEMES = [
  '/aliens.jpg',
  '/andy.jpg',
  '/bernie.jpg',
  '/biceps.jpg',
  '/brian.jpg',
  '/button.jpg',
  '/captain.jpg',
  '/dino.jpg',
  '/doge.jpg',
  '/everyone.jpg',
  '/everywhere.jpg',
  '/gentlemen.jpg',
  '/great.jpg',
  '/interesting.jpg',
  '/karen.jpg',
  '/kombucha.jpg',
  '/leo.jpg',
  '/mmm.jpg',
  '/not_sure.jpg',
  '/rent.jpg',
  '/right.jpg',
  '/seal.jpg',
  '/sheeesh.jpg',
  '/simply.jpg',
  '/skeptical.jpg',
  '/spiderman.jpg',
  '/spongebob_1.jpg',
  '/spongebob_2.jpg',
  '/stonks.jpg',
  '/think.jpg',
  '/veins.jpg',
  '/xzibit.jpg',
  '/yoda.jpg',
];

export const imageThemes: TileTheme[] = [
  {
    id: idPrefix('memes'),
    label: 'memes',
    type: 'image',
    values: MEMES.map(f => `${path}${f}`),
  },
];

function idPrefix(id: string) {
  return `image_${id}`;
}
