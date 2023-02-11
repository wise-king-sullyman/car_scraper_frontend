import React from "react";
import {
  Select,
  SelectProps,
  SelectOption,
  SelectList,
} from "@patternfly/react-core/next";
import { MenuToggle, MenuToggleElement } from "@patternfly/react-core";

export interface SelectorProps extends Omit<SelectProps, "toggle"> {
  children?: string[];
}

export const Selector: React.FunctionComponent<SelectorProps> = ({
  children,
  onSelect,
  ...props
}: SelectorProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string>("Select a value");
  const menuRef = React.useRef<HTMLDivElement>(null);

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const internalOnSelect = (
    event: React.MouseEvent<Element, MouseEvent> | undefined,
    itemId: string | number | undefined
  ) => {
    // eslint-disable-next-line no-console
    console.log("selected", itemId);

    setSelected(itemId as string);
    setIsOpen(false);
    onSelect && onSelect(event, itemId);
  };

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={toggleRef}
      onClick={onToggleClick}
      isExpanded={isOpen}
      style={
        {
          width: "200px",
        } as React.CSSProperties
      }
    >
      {selected}
    </MenuToggle>
  );

  const formattedNames =
    children?.map((reportName) => reportName.split("_")[0]) || [];

  const selectOptions = formattedNames.map((option) => (
    <SelectOption itemId={option}>{option}</SelectOption>
  ));
  return (
    <Select
      {...props}
      id="single-select"
      ref={menuRef}
      isOpen={isOpen}
      selected={selected}
      onSelect={internalOnSelect}
      onOpenChange={(isOpen) => setIsOpen(isOpen)}
      toggle={toggle}
    >
      <SelectList>{selectOptions}</SelectList>
    </Select>
  );
};
