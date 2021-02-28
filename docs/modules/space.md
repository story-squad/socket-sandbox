[socket-sandbox](../README.md) / [Exports](../modules.md) / space

# Module: space

## Table of contents

### Interfaces

- [connectedList](../interfaces/space.connectedlist.md)
- [lambdaListener](../interfaces/space.lambdalistener.md)
- [memorySpace](../interfaces/space.memoryspace.md)
- [spaceRoom](../interfaces/space.spaceroom.md)
- [userLand](../interfaces/space.userland.md)
- [userMap](../interfaces/space.usermap.md)

### Variables

- [listeners](space.md#listeners)
- [space](space.md#space)

### Functions

- [changeName](space.md#changename)
- [currentRoom](space.md#currentroom)
- [currentUsername](space.md#currentusername)
- [getWelcomeMessage](space.md#getwelcomemessage)
- [listRooms](space.md#listrooms)
- [listUsers](space.md#listusers)
- [matchWords](space.md#matchwords)
- [messageRoom](space.md#messageroom)

## Variables

### listeners

• `Const` **listeners**: [*lambdaListener*](../interfaces/space.lambdalistener.md)[]

Defined in: [space.ts:70](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/space.ts#L70)

___

### space

• `Const` **space**: [*memorySpace*](../interfaces/space.memoryspace.md)

Defined in: [space.ts:133](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/space.ts#L133)

## Functions

### changeName

▸ **changeName**(`socket`: *any*, `username`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *any* |
`username` | *string* |

**Returns:** *void*

Defined in: [space.ts:140](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/space.ts#L140)

___

### currentRoom

▸ **currentRoom**(`socket`: *any*): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *any* |

**Returns:** *any*

Defined in: [space.ts:150](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/space.ts#L150)

___

### currentUsername

▸ **currentUsername**(`socket`: *any*): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *any* |

**Returns:** *any*

Defined in: [space.ts:154](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/space.ts#L154)

___

### getWelcomeMessage

▸ **getWelcomeMessage**(`socket`: *any*): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`socket` | *any* |

**Returns:** *any*

Defined in: [space.ts:158](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/space.ts#L158)

___

### listRooms

▸ **listRooms**(): *any*

**Returns:** *any*

Defined in: [space.ts:190](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/space.ts#L190)

___

### listUsers

▸ **listUsers**(`room`: *string*): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`room` | *string* |

**Returns:** *any*

Defined in: [space.ts:196](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/space.ts#L196)

___

### matchWords

▸ **matchWords**(`subject`: *string*, `words`: *any*[]): *RegExpMatchArray*

#### Parameters:

Name | Type |
:------ | :------ |
`subject` | *string* |
`words` | *any*[] |

**Returns:** *RegExpMatchArray*

Defined in: [space.ts:200](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/space.ts#L200)

___

### messageRoom

▸ **messageRoom**(`io`: *any*, `socket`: *any*, `message`: *string*, `sender`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`io` | *any* |
`socket` | *any* |
`message` | *string* |
`sender` | *string* |

**Returns:** *void*

Defined in: [space.ts:180](https://github.com/story-squad/socket-sandbox/blob/688c684/src/sockets/space.ts#L180)
