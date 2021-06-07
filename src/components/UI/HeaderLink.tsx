import React from "react";

import classnames from "classnames";

type Props = {
  text: string;
  active: boolean;
  onClick: () => void;
};

export function HeaderLink({ active, text, onClick }: Props) {
  return (
    <a
      className={classnames("cursor-pointer hover:text-gray-900 mr-5", {
        "border-yellow-300": active,
        "border-b-2": active,
      })}
      onClick={onClick}
    >
      {text}
    </a>
  );
}
