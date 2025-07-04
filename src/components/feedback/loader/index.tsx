'use client';

import React from 'react';
import styles from './styles.module.scss';

interface Props {
  /**
   * Text to display for screen readers while loading
   */
  helpText?: string;
  className?: string;
}

/**
 * A loading component that displays a spinning SVG graphic.
 * Screen readers will be notified of the loading state via an ARIA live region and help text.
 */
export const Loader: React.FC<Props> = ({
  className = '',
  helpText = 'Loading...'
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`${styles.loader} ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 588 588"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        className={`${styles.svgRoot} ${styles.spinning}`}
      >
        <g id="Artboard1" transform="matrix(1,0,0,1,-927.289,-504.673)">
          <rect
            x="927.289"
            y="504.673"
            width="587.572"
            height="587.493"
            className={styles.svgRectNoFill}
          />
          <clipPath id="_clip1">
            <rect x="927.289" y="504.673" width="587.572" height="587.493" />
          </clipPath>
          <g clipPath="url(#_clip1)">
            <g transform="matrix(1,0,0,1,-86.0461,-65.2721)">
              <path
                d="M1013.62,854.785C1015.84,786.798 1041.19,724.618 1082.05,675.872L1119.03,683.333L1129.86,729.737C1102.24,766.037 1085.51,811.048 1084.51,859.895L1043.92,834.661L1013.62,854.785ZM1103.86,652.542C1150.36,607.878 1211.51,578.35 1279.34,571.918L1302.22,606.364L1279.22,643.359C1230.22,649.547 1186.16,671.664 1152.39,704.352L1142.1,660.259L1103.86,652.542ZM1311.11,570.619C1380.91,571.488 1444.89,596.744 1494.9,638.251L1486.18,681.473L1446.84,690.651C1409.98,661.039 1363.52,642.897 1312.91,641.662L1334.85,606.364L1311.11,570.619ZM1518.27,659.869C1564.31,707.309 1594.51,770.211 1600.28,839.997L1563.15,864.661L1529.32,843.636C1524.67,793.608 1503.45,748.355 1471.22,713.42L1509.25,704.547L1518.27,659.869ZM1601.19,872.021C1599.42,942.667 1572.66,1007.15 1529.44,1056.97L1488.04,1048.62L1478.42,1007.4C1508.37,971.602 1527.29,926.278 1529.96,876.665L1563.15,897.293L1601.19,872.021ZM1506.98,1080.17C1458.86,1124.73 1395.83,1153.4 1326.26,1157.82L1304.85,1125.59L1329.24,1086.36C1377.46,1081.66 1421.2,1061.56 1455.48,1031.05L1464.96,1071.69L1506.98,1080.17ZM1293.82,1158.11C1225.02,1154.98 1162.36,1128.15 1113.8,1085.6L1120.89,1050.48L1169.03,1039.25C1204.3,1067.23 1248.23,1084.75 1296.12,1087.14L1272.22,1125.59L1293.82,1158.11ZM1090.64,1062.95C1047.46,1015.81 1019.43,954.563 1014.31,886.959L1043.92,867.293L1086.36,893.675C1092.54,940.851 1113.49,983.406 1144.41,1016.54L1097.82,1027.41L1090.64,1062.95Z"
                style={{ fill: 'url(#_Linear2)' }}
              />
            </g>
            <g transform="matrix(1,0,0,1,0.288773,0.673247)">
              <path
                d="M1215.76,759.182L1215.76,759.03"
                className={styles.svgPathNoFill}
              />
            </g>
          </g>
        </g>
        <defs>
          <linearGradient
            id="_Linear2"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-327.656,345.861,-345.861,-327.656,1474.85,692.83)"
          >
            <stop offset="0" style={{ stopColor: '#6699cc', stopOpacity: 1 }} />
            <stop offset="1" style={{ stopColor: '#FD4484', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      {helpText && <span className={styles.visuallyHidden}>{helpText}</span>}
    </div>
  );
};

export default Loader;
