import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Swal from "sweetalert2";
import { SOCKET_ENDPOINT } from "../Routes/routes";

const END_POINT: string = `/topic/socket/client/`;

export const subscribeNotifications = (clientID: number) => {
    const websocket = new SockJS(SOCKET_ENDPOINT);

    const stompClient = Stomp.over(websocket);

    stompClient.connect({}, () => {
        stompClient.subscribe(`${END_POINT}${clientID}`, message => {
            alert(message.body)
        })
    })
    // stompClient.disconnect()
}