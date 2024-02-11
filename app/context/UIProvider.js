'use client'

import { createContext, useState } from "react";

export const UIContext = createContext();

function UIProvider({children}) {

    const [showHelpModal, setShowHelpModal] = useState(false)
    const [showResultsModal, setShowResultsModal] = useState(false)

    return (
        <UIContext.Provider
          value={{
            showHelpModal,
            setShowHelpModal,
            showResultsModal,
            setShowResultsModal,
          }}
        >
          {children}
        </UIContext.Provider>
      );
}

export default UIProvider;