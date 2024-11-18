import { Bell } from "lucide-react";
import { IconButton, IconButtonProps } from "../IconButton";

type NotificationProps = {} & IconButtonProps;

export const Notification = (props: NotificationProps) => {
  return (
    <IconButton aria-hidden="true" {...props}>
      <Bell size={20} />
    </IconButton>
  );
};
