import { useState } from "react";

const useCompareMode = () => {
  const [compareMode, setCompareMode] = useState(false);

  const enableCompareMode = () => setCompareMode(true);
  const disableCompareMode = () => setCompareMode(false);

  return { compareMode, enableCompareMode, disableCompareMode };
};

export default useCompareMode;
