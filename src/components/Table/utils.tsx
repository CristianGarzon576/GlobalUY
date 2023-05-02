import React from "react";
import { IconButton } from "../Button/IconButton";
import { STATUS } from "../../models/requests";

export interface ActionCellProps {
  index: number;
  original: any;
  onDeleteItem: (index: number) => void;
  onEditItem: (index: number) => void;
}

export const ActionCell = (props: ActionCellProps) => {
  const { index, original, onDeleteItem, onEditItem } = props;
  const handledDeleteItem = () => {
    onDeleteItem(index);
  };
  const handledEditItem = () => {
    onEditItem(original);
  };
  return (
    <div className="flex justify-center items-center">
      <IconButton
        classes={"mr-1"}
        onClick={handledEditItem}
        icon="edit"
        iconcolorclass="fill-[#D4D4D4] hover:fill-blue"
      />
      <IconButton
        classes={"ml-1"}
        onClick={handledDeleteItem}
        icon="delete"
        iconcolorclass="fill-[#D4D4D4] hover:fill-[#EA4335]"
      />
    </div>
  );
};

export interface ActionRequestCellProps {
  index: number;
  original: any;
  onApproveItem: (props: any) => void;
  onEditItem: (props: any) => void;
  onRejectItem: (props: any) => void;
}

export const ActionRequestCell = (props: ActionRequestCellProps) => {
  const { original, onRejectItem, onEditItem, onApproveItem } = props;
  const handledRejectItem = () => {
    onRejectItem(original);
  };
  const handledApproveItem = () => {
    onApproveItem(original);
  };
  const handledEditItem = () => {
    onEditItem(original);
  };

  const isWaiting =
    original.status === STATUS.waiting || original.status === undefined;

  if (isWaiting) {
    return (
      <div className="flex justify-center items-center">
        <IconButton
          classes={"mr-1"}
          onClick={handledApproveItem}
          icon="check"
          iconcolorclass="fill-[#D4D4D4] hover:fill-blue"
        />
        <IconButton
          classes={"mr-1"}
          onClick={handledEditItem}
          icon="edit"
          iconcolorclass="fill-[#D4D4D4] hover:fill-blue"
        />
        <IconButton
          classes={"ml-1"}
          onClick={handledRejectItem}
          icon="delete"
          iconcolorclass="fill-[#D4D4D4] hover:fill-[#EA4335]"
        />
      </div>
    );
  }
  return null;
};

export const IndeterminateCheckbox = React.forwardRef<HTMLInputElement>(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);
