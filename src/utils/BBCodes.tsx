import parser, { Tag } from "bbcode-to-react";
import React, { ReactNode } from "react";

class PTag extends Tag {
  toReact(): ReactNode {
    return (
      <p>
        {this.getContent()}
      </p>
    )
  }
}

export const registerTags = () => {
  parser.registerTag('p', PTag as any);
}
