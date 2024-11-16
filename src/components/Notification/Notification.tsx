type NotificationProps = {
  name: string;
};

export const Notification = ({ name }: NotificationProps) => {
  return <div>{name}</div>;
};
