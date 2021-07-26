import React, { useCallback, useContext, useRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slide from "@material-ui/core/Slide";
import "../assets/style/dialog.css";
import { useIsMobileScreen } from "../hooks/useIsMobileScreen";
const DialogManagerContext = React.createContext({});

const useStylesDialog = makeStyles({
  paper: {
    overflowX: "hidden !important",
    overflowY: "auto !important",
  },
  paperScrollPaper: {
    justifyContent: "center",
  },
  tender: { overflowY: "inherit !important" },
});

/**
 * Represents DialogManager Context + Dialog component.
 * @example Open a dialog. DialogContentComponent is a functional or class component.
 * const {openDialog} = useDialogManager()
 * if (shouldOpenDialog) {
 * 	openDialog(DialogContentComponent, options)
 * }
 *
 */
export function DialogManager({ children }) {
  const isMobileScreen = useIsMobileScreen();
  const classes = useStylesDialog();

  const [currentDialogComponent, setCurrentDialogComponent] = useState(
    undefined
  );
  const [currentDialogContentProps, setCurrentDialogContentProps] = useState(
    undefined
  );
  const [currentDialogProps, setCurrentDialogProps] = useState(undefined);
  const [open, setOpen] = useState(false);

  /**
   * Ref to hold actual onDialogExited logic.
   * In case openDialog() from useDialogManager() is called inside another dialog
   * we close current dialog and open elements dialog inside onExited callback of Dialog's transition.
   */
  const onExitedInner = useRef();

  const closeDialog = useCallback((afterClose) => {
    if (afterClose) {
      onExitedInner.current = () => {
        afterClose();
        onExitedInner.current = undefined;
      };
    } else {
      onExitedInner.current = undefined;
    }
    setOpen(false);
    setCurrentDialogContentProps(undefined);
    setCurrentDialogProps(undefined);
  }, []);

  const onDialogExited = useCallback(() => {
    if (onExitedInner.current) {
      onExitedInner.current();
    }
  }, []);

  const openDialog = useCallback((DialogContentComponent, options) => {
    if (!DialogContentComponent) {
      console.error(
        "Need to pass DialogContentComponent to openDialog callback!"
      );
      return;
    }
    const { DialogProps, DialogContentProps } = options ?? {};

    function setCurrents() {
      setCurrentDialogComponent((before) => {
        //need to wrap it in function to pass it as expected.
        //passing this way: setCurrentDialogComponent(DialogContentComponent) doesn't work well since
        //DialogContentComponent is a function by itself
        return DialogContentComponent;
      });
      setCurrentDialogProps(DialogProps);
      setCurrentDialogContentProps(DialogContentProps);
    }

    setOpen((open) => {
      if (!open) {
        //no currently open dialog. Simple open.
        setCurrents();
        return true;
      } else {
        //call to openDialog within another dialog.
        //Close current dialog first, and open elements one inside onExited transition callback.
        onExitedInner.current = () => {
          setOpen(true);
          setCurrents();
        };
        return false;
      }
    });
  }, []);

  return (
    <DialogManagerContext.Provider
      value={{
        closeDialog,
        openDialog,
      }}
    >
      {children}

      <Dialog
        open={open}
        onClose={closeDialog}
        disableBackdropClick
        fullScreen={!!isMobileScreen}
        scroll={isMobileScreen ? "body" : "paper"}
        TransitionComponent={Slide}
        transitionDuration={{ enter: 350, exit: 300 }}
        TransitionProps={{ direction: "up", onExited: onDialogExited }}
        maxWidth={"lg"}
        classes={{ paper: classes.tender }}
        {...currentDialogProps}
      >
        {currentDialogComponent !== undefined &&
          React.createElement(
            currentDialogComponent,
            currentDialogContentProps
          )}
      </Dialog>
    </DialogManagerContext.Provider>
  );
}

/**
 * Custom Hook to get access to DialogManager actions like openDialog and closeDialog.
 */
export function useDialogManager() {
  return useContext(DialogManagerContext);
}
