import * as React from 'react';

export interface MessageItemProps {
  txt: string,
  key: number,
  name: string | undefined
}
const MessageItem: React.FunctionComponent<MessageItemProps> = (p) => {
  const { txt, key, name } = p;
  const [player,...message] = txt.split(','); // [ player_id, message ]
  const k = key+1;
  const title = `${player}/${k}`;
  return (
    <li className="li-message" key={k} style={{
      listStyleType: "none",
      margin: 0,
      padding: 0,
      textAlign: "left"
    }} title={title}>({name})   {message}</li>
  );
}

export default MessageItem;