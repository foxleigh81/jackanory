import { nameToInitials } from './helpers/name-to-initials';
import { getRandomColour } from './helpers/get-random-colour';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Prop Types */
export interface Props extends React.ComponentProps<'div'> {
  /**
   * The name of the person if no name is provided then it will display a default
   * avatar to indicate that this has not been assigned to a person.
   */
  name?: string;
  /**
   * The background colour of the avatar if no image is provided defaults to
   * the a random colour.
   */
  colour?: string;
  /**
   * The image to display, if no image is provided then it will use the initials
   * of the name provided. If no name is provided then it will display a default
   * avatar to indicate that this has not been assigned to a person.
   * @default ?
   */
  imagePath?: string;
  /**
   * The size of the avatar using CSS values.
   * @default 80px
   */
  size?: string;
  /**
   * Is the avatar loading
   * @default false
   */
  isLoading?: boolean;
}

/**
 * The 'Avatar' component is used to display a user's profile picture. If no image
 * is provided then a users initials will be displayed.
 */
export const Avatar: React.FC<Props> = ({
  name,
  colour = getRandomColour(),
  imagePath,
  isLoading = false,
  size = '80px',
  className,
  ...props
}: Props) => {
  const initials = name ? nameToInitials(name) : '?';
  const viewBox = name ? '0 0 40 40' : '0 0 30 30';
  return (
    <div
      className={[
        styles.avatar,
        {
          [styles['is-loading']]: isLoading
        },
        className
      ].join(' ')}
      style={{ height: size, backgroundColor: colour }}
      aria-busy={isLoading}
      {...props}
    >
      {imagePath ? (
        <picture>
          <img className={styles.image} src={imagePath} alt={name} />
        </picture>
      ) : (
        <div className={styles.initials}>
          <svg viewBox={viewBox}>
            <text y="53%" x="51%">
              {initials}
            </text>
          </svg>
        </div>
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';

export default Avatar;
