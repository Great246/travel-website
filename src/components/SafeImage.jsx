import { useState } from "react";

// Falls back to a navy/blue gradient if a remote image fails to load.
export default function SafeImage({ src, alt, className = "", ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-gradient-to-br from-navy via-ocean to-sky-400 ${className}`}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
      {...rest}
    />
  );
}
