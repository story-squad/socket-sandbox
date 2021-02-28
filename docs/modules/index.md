[socket-sandbox](../README.md) / [Exports](../modules.md) / index

# Module: index

## Table of contents

### Properties

- [default](index.md#default)

## Properties

### default

• **default**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`handleDisconnect` | (`io`: *any*, `socket`: *any*, `space`: *any*) => *Promise*<void\> |
`handleJoin` | (`io`: *any*, `socket`: *any*, `space`: *any*, `surfaceID`: *string*) => *Promise*<void\> |
`handleLeave` | (`io`: *any*, `socket`: *any*, `space`: *any*) => *Promise*<void\> |
`handleMessageRoom` | (`io`: *any*, `socket`: *any*, `space`: *any*, `room`: *string*, `message`: *any*) => *Promise*<void\> |
`handleStart` | (`io`: *any*, `socket`: *any*, `space`: *any*, `username`: *string*) => *Promise*<void\> |
`screenMessage` | (`io`: *any*, `socket`: *any*, `space`: *any*, `room`: *string*, `message`: *any*) => *Promise*<boolean\> |
`space` | [*memorySpace*](../interfaces/space.memoryspace.md) |
