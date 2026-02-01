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

interface BrandAssetBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  asset: BrandAssetName;
}

function BrandAssetBox({ asset, className, style, ...props }: BrandAssetBoxProps) {
  return (
    <div
      data-slot="brand-asset-box"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[14px] border-[1.2px] border-gray-200 bg-gray-0",
        className
      )}
      style={{
        width: 49,
        height: 57,
        boxShadow: "0px 4px 30px 0px #D7DCE180",
        ...style,
      }}
      {...props}
    >
      <BrandAsset asset={asset} size={30} />
    </div>
  );
}

export { BrandAsset, BrandAssetBox, brandAssets };
