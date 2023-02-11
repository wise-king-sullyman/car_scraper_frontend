import React from "react";
import { Menu, MenuContent, MenuList, MenuItem } from "@patternfly/react-core";

export interface ReportIndexProps {
  children?: string[];
  onSelect?: (event: any, itemId: any) => void;
}

export const ReportIndex: React.FunctionComponent<ReportIndexProps> = ({
  children,
  onSelect,
}: ReportIndexProps) => {
  const fromattedNames =
    children?.map((reportName) => reportName.split("_")[0]) || [];
  const formattedIndex = fromattedNames.map((name) => (
    <MenuItem key={name}>{name}</MenuItem>
  ));
  return (
    <Menu onSelect={onSelect}>
      <MenuContent>
        <MenuList>{formattedIndex}</MenuList>
      </MenuContent>
    </Menu>
  );
};
