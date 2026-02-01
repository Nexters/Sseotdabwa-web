import * as React from "react";
import { cn } from "@/lib/utils";

import Bill from "./brand-assets/bill.svg?react";
import Book from "./brand-assets/book.svg?react";
import Clap from "./brand-assets/clap.svg?react";
import Coin from "./brand-assets/coin.svg?react";
import Drawer from "./brand-assets/drawer.svg?react";
import Pants from "./brand-assets/pants.svg?react";
import Phone from "./brand-assets/phone.svg?react";
import Socks from "./brand-assets/socks.svg?react";
import Tshirt from "./brand-assets/tshirt.svg?react";

const brandAssets = {
  bill: Bill,
  book: Book,
  clap: Clap,
  coin: Coin,
  drawer: Drawer,
  pants: Pants,
  phone: Phone,
  socks: Socks,
  tshirt: Tshirt,
} as const;

export type BrandAssetName = keyof typeof brandAssets;

interface BrandAssetProps extends React.SVGProps<SVGSVGElement> {
  asset: BrandAssetName;
  size?: number;
}

function BrandAsset({ asset, size = 30, className, ...props }: BrandAssetProps) {
  const AssetComponent = brandAssets[asset];

  return (
    <AssetComponent
      data-slot="brand-asset"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

export { BrandAsset, brandAssets };
