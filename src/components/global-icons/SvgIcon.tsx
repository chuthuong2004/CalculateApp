import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';
interface SVGIconProps extends SvgProps {
  d: string[];
}

const SVGIcon = ({d, width = 48, height = 48, ...passProps}: SVGIconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    fill="none"
    {...passProps}>
    <G id="ppe_face_mask">
      {d && d.length > 0
        ? d.map((item, index) => (
            <Path
              id="Vector"
              fillRule="evenodd"
              clipRule="evenodd"
              d={item}
              fill={passProps.fill || 'black'}
              key={item + index}
            />
          ))
        : null}
    </G>
  </Svg>
);
export default SVGIcon;
