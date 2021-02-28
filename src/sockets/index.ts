import handleStart from "./handleStart";
import {handleJoin, handleLeave} from "./handleJoin";
import handleDisconnect from "./handleDisconnect";
import { handleMessageRoom, screenMessage } from "./handleSendMessage";
import {space} from "./space";

export default {
  space,
  handleStart,
  handleJoin, handleLeave,
  handleDisconnect,
  handleMessageRoom,
  screenMessage
};
