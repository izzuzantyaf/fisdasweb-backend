export default function isGoogleDriveLink(link: string) {
  return link.startsWith('https://drive.google.com/file/d/');
}
