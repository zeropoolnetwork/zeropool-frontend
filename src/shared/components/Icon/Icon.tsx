import React, { forwardRef, HTMLAttributes, memo } from 'react';
import { cn } from '@bem-react/classname';

import './Icon.scss';

import { IconOption } from 'shared/components/Icon/IconOption';

export const componentId = 'Icon';

const css = cn(componentId);

export interface IconProps extends HTMLAttributes<HTMLElement> {
  icon: IconOption;
  spaceOn?: 'right' | 'left';
}

const component = memo(
  forwardRef<HTMLElement, IconProps>(({ icon, spaceOn, ...props }, ref) => (
    <i
      {...props}
      className={css(
        {
          [icon]: true,
          RightMargin: spaceOn === 'right',
          LeftMargin: spaceOn === 'left',
          Clickable: !!props.onClick,
        },
        [props.className],
      )}
      ref={ref}
    ></i>
  )),
);

component.displayName = componentId;

export const Icon = component;