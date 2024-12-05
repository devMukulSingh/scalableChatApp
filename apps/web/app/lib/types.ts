export interface ISocketMessage {
    message: string,
    senderId: string,
    receiverId: string
    createdAt:string
}

export interface IMessage extends ISocketMessage {
    id:string,
}

export interface IUser{
    id:string,
    name:string,
    email:string,
    sentMessages : IMessage[],
    receivedMessages : IMessage[]
}