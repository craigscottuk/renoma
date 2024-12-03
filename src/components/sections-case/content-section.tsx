import React from "react";
import MaxWidthWrapper from "../max-width-wrapper";
import ImageCarousel from "../ImageCarousel";

export default function ContentSection() {
  return (
    <div>
      {/* 1 */}
      {/* Text on the left and photo on the right */}

      <MaxWidthWrapper>
        <h2 className="mb-8 font-bolder text-4xl">Aktualny Stan</h2>
      </MaxWidthWrapper>
      <MaxWidthWrapper className={`flex flex-col lg:flex-row lg:gap-8`}>
        {/* Empty column */}

        <div className="flex-1 lg:w-1/2">This is column 1</div>

        {/* TDImahe carosuel  */}
        <div className="flex flex-col lg:w-1/2 lg:items-start">
          <ImageCarousel
            images={[
              { src: "/placeholder.png", caption: "Caption 1" },
              { src: "/placeholder.png", caption: "Caption 2" },
            ]}
          />
        </div>
      </MaxWidthWrapper>

      {/* 2 */}
      {/* Photo on the left and text on the right */}
      <MaxWidthWrapper className={`flex flex-col lg:flex-row lg:gap-8`}>
        {/* Empty column */}
        <div className="flex-1 lg:w-1/2">This is column 1</div>
        {/* Details column */}
        <div className="flex flex-col lg:w-1/2 lg:items-start">
          This is column 2
        </div>
      </MaxWidthWrapper>

      {/* 3 */}
      {/* Text on the left and text on the right */}
      <MaxWidthWrapper className={`flex flex-col lg:flex-row lg:gap-8`}>
        {/* Empty column */}
        <div className="flex-1 lg:w-1/2">This is column 1</div>
        {/* Details column */}
        <div className="flex flex-col lg:w-1/2 lg:items-start">
          This is column 2
        </div>
      </MaxWidthWrapper>

      {/* 4 */}
      {/* Text on the left and text on the right */}
      <MaxWidthWrapper className={`flex flex-col lg:flex-row lg:gap-8`}>
        {/* Empty column */}
        <div className="flex-1 lg:w-1/2">This is column 1</div>
        {/* Details column */}
        <div className="flex flex-col lg:w-1/2 lg:items-start">
          This is column 2
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
