'use client'

import { createContext, useState } from "react";

export const UIContext = createContext();

function UIProvider({children}) {

    const [showHelpModal, setShowHelpModal] = useState(false)
    const [showResultsModal, setShowResultsModal] = useState(true)

    // const logModalState = (() => {
    //     console.log('help modal on: ' + showHelpModal)
    //     console.log('results modal on: ' + showResultsModal)
    // })

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