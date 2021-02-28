[socket-sandbox](../README.md) / [Exports](../modules.md) / common

# Module: common

## Table of contents

### Variables

- [b64](common.md#b64)
- [localAxios](common.md#localaxios)

### Functions

- [privateMessage](common.md#privatemessage)

## Variables

### b64

• `Const` **b64**: *object*

Base64 string operatoins

#### Type declaration:

Name | Type |
:------ | :------ |
`decode` | (`str`: *string*) => *string* |
`encode` | (`str`: *string*) => *string* |

Defined in: [common.ts:51](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/common.ts#L51)

___

### localAxios

• `Const` **localAxios**: AxiosInstance

use for internal calls to /api/endoints

Defined in: [common.ts:6](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/common.ts#L6)

## Functions

### privateMessage

▸ **privateMessage**(`io`: *any*, `socket`: *any*, `listener`: *string*, `content`: *any*): *Promise*<void\>

sends a message to socket.id

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`io` | *any* | any (socketio)   |
`socket` | *any* | any (socketio)   |
`listener` | *string* | string (event being listend for)   |
`content` | *any* | any    |

**Returns:** *Promise*<void\>

Defined in: [common.ts:20](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/common.ts#L20)
