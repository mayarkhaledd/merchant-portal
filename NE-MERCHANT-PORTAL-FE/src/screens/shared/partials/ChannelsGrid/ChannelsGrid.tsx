import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChannelGridProps } from "./ChannelGrid.types";

export const ChannelsGrid: React.FC<ChannelGridProps> = ({
  columns,
  channelData,
  variants = "zebraStripe",
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data: channelData,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className="  bg-white gap-4 mt-5">
      <div className=" w-full">
        {!channelData ? (
          <div>No Data to Show</div>
        ) : (
          <>
            <div className="min-w-full overflow-x-auto my-4 custom-scrollbar">
              <table className="px-4 w-full">
                <thead className="border-t border-[#F2F2F2]">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="border-b border-[#F2F2F2] flex w-full py-3.5"
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <React.Fragment key={header.id}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`border-b flex items-center w-fit lg:w-full ${
                        variants === "zebraStripe"
                          ? index % 2 === 0
                            ? "bg-[#FCFCFC]"
                            : "bg-white"
                          : ""
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <React.Fragment key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
