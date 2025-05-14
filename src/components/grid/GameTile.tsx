import { Fragment } from 'react';
import { TileTheme } from '../../state/gameSettingsAtom';
import classes from './GameTile.module.css';
import clsx from 'clsx';

type Props = {
  value?: string;
  isShown?: boolean;
  onClick?: () => unknown;
  type: TileTheme['type'];
};

function GameTile({ value, isShown = false, onClick, type }: Props) {
  const tileProps: ThemeTileProps = {
    value,
    isShown,
    onClick,
    className: clsx(
      classes.tile,
      isShown && classes.shown,
      !!value && classes.active,
    ),
  };
  return (
    <Fragment>
      {type === 'color' && <ColorTile {...tileProps} />}
      {type === 'image' && <ImageTile {...tileProps} />}
      {type === 'emoji' && <EmojiTile {...tileProps} />}
    </Fragment>
  );
}

export default GameTile;

type ThemeTileProps = {
  onClick?: Props['onClick'];
  className: string;
  value?: string;
  isShown: boolean;
};

const ColorTile = ({ onClick, className, value, isShown }: ThemeTileProps) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{ backgroundColor: isShown ? value : undefined }}
    />
  );
};

const ImageTile = ({ onClick, className, value, isShown }: ThemeTileProps) => {
  return (
    <button onClick={onClick} className={className}>
      <span
        className={clsx(classes.image, isShown && classes['visible-image'])}
        style={{
          backgroundImage: `url("${value}")`,
        }}
      ></span>
    </button>
  );
};

const EmojiTile = ({ onClick, className, value, isShown }: ThemeTileProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(className, classes['emoji-container'])}
    >
      <span
        className={clsx(classes.emoji, isShown && classes['visible-emoji'])}
      >
        {value}
      </span>
    </button>
  );
};
