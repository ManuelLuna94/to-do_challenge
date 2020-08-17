import React, { useState } from "react";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import CancelIcon from "@material-ui/icons/Cancel";

import Classes from "./Notification.module.css";

function Notification(props) {
  const { open, title, content, autoClose, delay, onClose } = props;

  const [currentClasses, setCurrentClasses] = useState(`${Classes.container}`);

  const close = () => {
    setCurrentClasses(`${Classes.container} ${Classes.deactive}`);
    setTimeout(() => onClose(), 1000); // Leave transition takes 1s
  };

  if (autoClose) {
    setTimeout(() => close(), delay || 2000);
  }

  return open ? (
    <div className={currentClasses}>
      <CancelIcon className={Classes.closeIcon} onClick={close} />
      <div className={Classes.titleContainer}>
        <h1 className={Classes.title}>{title}</h1>
        <EmojiObjectsIcon style={{ color: "#fcf003" }} />
      </div>
      <h2 className={Classes.content}>{content}</h2>
    </div>
  ) : null;
}

export default Notification;
