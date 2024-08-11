import JSZip from "jszip";

export const createZipFile = (jsonContent) => {
  const zip = new JSZip();

  const packageJson =
    JSON.parse(jsonContent["package.json"]) || "codai-project";
  const projectName = packageJson.name;

  for (const filePath in jsonContent) {
    if (jsonContent.hasOwnProperty(filePath)) {
      const fileContent = jsonContent[filePath];
      zip.file(filePath, fileContent);
    }
  }

  return zip.generateAsync({ type: "blob" }).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName}.zip`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  });
};
