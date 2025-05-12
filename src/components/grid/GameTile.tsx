import classes from './GameTile.module.css';
import clsx from 'clsx';

type Props = {
  value?: string;
  isShown?: boolean;
  onClick?: () => unknown;
};

function GameTile({ value, isShown, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        classes.tile,
        isShown && classes.shown,
        !!value && classes.active,
      )}
      style={{
        backgroundColor: isShown ? value : undefined,
      }}
    />
  );
}

export default GameTile;
