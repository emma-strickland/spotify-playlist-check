const getId = (type, link) => {
  // parse out id after playlist/ and before ?
  let playlistStr = link.slice(link.indexOf(`${type}/`), link.indexOf('?'));
  console.log(playlistStr)

  let result = playlistStr.slice(playlistStr.indexOf('/') + 1);
  return result;
}

// Test playlist and user links - should return true
// const playlistLink = 'https://open.spotify.com/playlist/1OUxxWU6Ov0yMF4gY4f31e?si=b44d3e4311384c5d';
// const userLink = 'https://open.spotify.com/user/1242322676?si=84e984c9fbd7412c';

// console.log(getId('playlist', playlistLink));
// console.log(getId('user', userLink));

export default getId;