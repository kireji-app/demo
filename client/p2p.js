const
 localRTC = new RTCPeerConnection(),
 remoteRTC = new RTCPeerConnection(),
 sendChannel = localRTC.createDataChannel("sendChannel");
 /*
input.onsubmit = () => sendChannel.send(input.value);
sendChannel.onopen = sendChannel.onclose = () => {
 input.setAttribute('state', sendChannel?.readyState);
}
remoteRTC.ondatachannel = ({ channel }) => {
 channel.onmessage = ({ data }) => DO['chat message'](JSON.parse(data));
 channel.onopen = channel.onclose = () => warning("channel state now" + channel?.readyState);
}
localRTC.onicecandidate = e => !e.candidate
 || remoteRTC.addIceCandidate(e.candidate)
  .catch(err => log("ICE error:" + err.toString()));
remoteRTC.onicecandidate = e => !e.candidate
 || localRTC.addIceCandidate(e.candidate)
  .catch(err => log("ICE error:" + err.toString()));
localRTC.createOffer()
 .then(offer => localRTC.setLocalDescription(offer))
 .then(() => remoteRTC.setRemoteDescription(localRTC.localDescription))
 .then(() => remoteRTC.createAnswer())
 .then(answer => remoteRTC.setLocalDescription(answer))
 .then(() => localRTC.setRemoteDescription(remoteRTC.localDescription))
 .catch(err => log("Unable to create an offer: " + err.toString()));*/