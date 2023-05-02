import React, { useEffect, useRef } from "react";
import { IconButton } from "../Button/IconButton";

export interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[] | undefined;
}

const useOutsideAlerrter = (ref: any, onClose: () => void) => {
  useEffect(() => {
    const handledClickOutside = (event: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handledClickOutside);
    return () => {
      document.removeEventListener("mousedown", handledClickOutside);
    };
  }, [ref]);
};

export const Modal: (props: ModalProps) => JSX.Element = ({
  showModal,
  onClose,
  children,
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerrter(wrapperRef, onClose);
  return (
    <>
      {showModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                ref={wrapperRef}
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none pb-6"
              >
                <div className="relative w-full mb-7">
                  <IconButton
                    onClick={onClose}
                    classes="rounded-xl position absolute right-1.5 top-1.5"
                    iconcolorclass="fill-[#D4D4D4]"
                    icon="delete"
                  />
                </div>
                {children}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
};
