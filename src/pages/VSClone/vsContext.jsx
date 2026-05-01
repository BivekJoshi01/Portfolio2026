import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VS_FILES, findFileByPath } from "./vsFiles";

// eslint-disable-next-line react-refresh/only-export-components
export const VsContext = createContext(null);

const DEFAULT_OPEN_IDS = ["about", "projects"];

export const VsProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openFileIds, setOpenFileIds] = useState(DEFAULT_OPEN_IDS);
  const [activityPanel, setActivityPanel] = useState("explorer");
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  // Sync open tabs with whatever route the user lands on
  useEffect(() => {
    const file = findFileByPath(location.pathname);
    if (!file) return;
    setOpenFileIds((prev) =>
      prev.includes(file.id) ? prev : [...prev, file.id]
    );
  }, [location.pathname]);

  const activeFile = useMemo(
    () => findFileByPath(location.pathname),
    [location.pathname]
  );

  const openFiles = useMemo(
    () => openFileIds.map((id) => VS_FILES.find((f) => f.id === id)).filter(Boolean),
    [openFileIds]
  );

  const openFile = useCallback(
    (fileOrId) => {
      const id = typeof fileOrId === "string" ? fileOrId : fileOrId.id;
      const file = VS_FILES.find((f) => f.id === id);
      if (!file) return;
      setOpenFileIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      navigate(file.path);
    },
    [navigate]
  );

  const closeFile = useCallback(
    (id) => {
      setOpenFileIds((prev) => {
        const next = prev.filter((x) => x !== id);
        // If we just closed the active tab, navigate to the last remaining tab
        if (activeFile?.id === id) {
          const fallback = next[next.length - 1];
          if (fallback) {
            const target = VS_FILES.find((f) => f.id === fallback);
            if (target) navigate(target.path);
          } else {
            navigate("/vs-profile");
          }
        }
        return next;
      });
    },
    [activeFile, navigate]
  );

  const value = useMemo(
    () => ({
      openFiles,
      activeFile,
      openFile,
      closeFile,
      activityPanel,
      setActivityPanel,
      terminalOpen,
      setTerminalOpen,
      rightPanelOpen,
      setRightPanelOpen,
    }),
    [
      openFiles,
      activeFile,
      openFile,
      closeFile,
      activityPanel,
      terminalOpen,
      rightPanelOpen,
    ]
  );

  return <VsContext.Provider value={value}>{children}</VsContext.Provider>;
};
