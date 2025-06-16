import { TTableColumns, TTableColumnsDef } from "eds-react";

export interface ChannelGridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  channelData: TTableColumns[] | any;
  columns: TTableColumnsDef[];
  variants?: "zebraStripe" | "default";
}
