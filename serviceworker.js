self.addEventListener("install", function(event) {
  console.debug("installing worker");
});

self.addEventListener("fetch", function(event) {
  console.debug("fetch", event);
  // We should supply responses for offline case here
});
