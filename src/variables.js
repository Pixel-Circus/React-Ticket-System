var variables = {
  phpfolder: "http://tickets.pixelcircusclient.com/php/",
  categories: {
    100: "En attente",
    200: "Assigné",
    300: "Réponse pour client",
    400: "Fermé",
  },
};
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  //console.log("Localhost");
  variables.phpfolder = "http://tickets.pixelcircus.d3v/php/";
}
export default variables;
