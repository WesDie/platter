"use client";

import { RecordsList } from "@/app/components/RecordsList";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import type { Record } from "@/app/db/schema";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function MainRecords() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const handleRecordSelect = (record: Record) => {
    setSelectedRecord(record);
    setIsCollapsed(false);
  };

  return (
    <ResizablePanelGroup
      className="w-full min-h-screen max-h-screen"
      direction="horizontal"
    >
      <ResizablePanel>
        <RecordsList userId={1} onRecordSelect={handleRecordSelect} />
      </ResizablePanel>
      {!isCollapsed && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel
            maxSize={75}
            defaultSize={30}
            minSize={30}
            collapsible
            onCollapse={() => setIsCollapsed(true)}
            className="p-4 pt-24"
          >
            {selectedRecord ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-48 h-48 relative">
                    {selectedRecord.imageUrl ? (
                      <Image
                        src={selectedRecord.imageUrl}
                        alt={`${selectedRecord.title} cover`}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No cover</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">
                      {selectedRecord.title}
                    </h2>
                    <p className="text-xl text-muted-foreground">
                      {selectedRecord.artist}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Release Year</p>
                    <p>{selectedRecord.releaseYear}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Format</p>
                    <p>{selectedRecord.format}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Condition</p>
                    <p>{selectedRecord.condition}</p>
                  </div>
                </div>
                {selectedRecord.notes && (
                  <>
                    <Separator />
                    <p className="text-sm mt-4">{selectedRecord.notes}</p>
                  </>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Select a record to view details
              </div>
            )}
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
}
