import * as React from "react";
import { cn } from "@/lib/utils";

import Noti from "./icons/noti.svg?react";
import NotiSolid from "./icons/noti-solid.svg?react";
import Plus from "./icons/plus.svg?react";
import Cross from "./icons/cross.svg?react";
import Right from "./icons/right.svg?react";
import Left from "./icons/left.svg?react";
import Down from "./icons/down.svg?react";
import DotsSolid from "./icons/dots-solid.svg?react";
import VoteSolid from "./icons/vote-solid.svg?react";
import CheckedVoteSolid from "./icons/checked-vote-solid.svg?react";
import CameraSolid from "./icons/camera-solid.svg?react";
import Krw from "./icons/krw.svg?react";
import MySolid from "./icons/my-solid.svg?react";
import ProductSolid from "./icons/product-solid.svg?react";
import CircleCheckedSolid from "./icons/circle-checked-solid.svg?react";
import Expand from "./icons/expand.svg?react";

const icons = {
  noti: Noti,
  "noti-solid": NotiSolid,
  plus: Plus,
  cross: Cross,
  right: Right,
  left: Left,
  down: Down,
  "dots-solid": DotsSolid,
  "vote-solid": VoteSolid,
  "checked-vote-solid": CheckedVoteSolid,
  "camera-solid": CameraSolid,
  krw: Krw,
  "my-solid": MySolid,
  "product-solid": ProductSolid,
  "circle-checked-solid": CircleCheckedSolid,
  expand: Expand,
} as const;

export type IconName = keyof typeof icons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconName;
  size?: number;
}

function Icon({ icon, size = 20, className, ...props }: IconProps) {
  const IconComponent = icons[icon];

  return (
    <IconComponent
      data-slot="icon"
      width={size}
      height={size}
      className={cn("shrink-0 text-gray-900", className)}
      {...props}
    />
  );
}

export { Icon, icons };
