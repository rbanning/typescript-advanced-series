export async function copyToClipboard(text: string) {
  if ('clipboard' in navigator) {
    await navigator.clipboard.writeText(text);
  } else {
    throw new Error("Unable to copy to clipboard: Looks like your browser does not support the Clipboard API");
  }
}