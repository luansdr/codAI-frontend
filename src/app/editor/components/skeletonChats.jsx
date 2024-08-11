import React from "react";
import { Skeleton, Button } from "@nextui-org/react";

export default function SkeletonChats({active}) {
  return (
    <>
      <div className="flex px-4 py-1 justify-center">
        <Button
          disabled={true}
          className={`w-full pointer-events-none ${
            active ? "justify-start" : ""
          }`}
          isIconOnly={!active}
          variant="light"
          color="default"
        >
          <div>
            <Skeleton className="flex rounded-full w-5 h-5" />
          </div>

          <div className={`ml-4 w-full ${!active ? "hidden" : ""} `}>
            <Skeleton className="flex rounded-full w-full h-5" />
          </div>
        </Button>
      </div>
      <div className="flex px-4 py-1 justify-center">
        <Button
          disabled={true}
          className={`w-full pointer-events-none ${
            active ? "justify-start" : ""
          }`}
          isIconOnly={!active}
          variant="light"
          color="default"
        >
          <div>
            <Skeleton className="flex rounded-full w-5 h-5" />
          </div>

          <div className={`ml-4 w-full ${!active ? "hidden" : ""} `}>
            <Skeleton className="flex rounded-full w-full h-5" />
          </div>
        </Button>
      </div>
      <div className="flex px-4 py-1 justify-center">
        <Button
          disabled={true}
          className={`w-full pointer-events-none ${
            active ? "justify-start" : ""
          }`}
          isIconOnly={!active}
          variant="light"
          color="default"
        >
          <div>
            <Skeleton className="flex rounded-full w-5 h-5" />
          </div>

          <div className={`ml-4 w-full ${!active ? "hidden" : ""} `}>
            <Skeleton className="flex rounded-full w-full h-5" />
          </div>
        </Button>
      </div>
    </>
  );
}
