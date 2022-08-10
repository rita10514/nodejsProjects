
function getTransLeft(reqSession){
  if(!reqSession.admin){
    return reqSession.transLeft -= 1
  }
  return reqSession.transLeft

}


function hasPermission(reqSession){
  console.log("hasPermission")
  let sesAuth = reqSession.authenticated
  let sesTransLeft = reqSession.transLeft
  let sesAdmin = reqSession.admin
  return ((sesAuth  && (sesTransLeft > 0)) || (sesAdmin && sesAuth )) ? true: false
}

module.exports = {getTransLeft, hasPermission}
