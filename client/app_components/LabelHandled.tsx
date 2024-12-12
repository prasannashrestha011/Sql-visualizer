import React from "react";
import { Handle, HandleProps } from "reactflow";

interface LabeledHandleProps extends HandleProps {
  title?: string; // Label text for the handle
  labelStyle?: React.CSSProperties; // Styling for the label
  labelclassName?: string; // Additional CSS classes for the label
}

export const LabeledHandle: React.FC<LabeledHandleProps> = ({
  title,
  labelStyle,
  labelclassName,
  ...props
}) => {
  return (
    <div className="relative flex items-center">
      {/* Render the handle */}
      <Handle {...props} />
      
      {/* Render the label if provided */}
      {title && (
        <span
          className={`absolute text-xs ${labelclassName || ""}`}
          style={{
            left: props.position === "left" ? "-30px" : "30px", // Position label left/right
            whiteSpace: "nowrap",
            ...labelStyle,
          }}
        >
          {title}
        </span>
      )}
    </div>
  );
};
