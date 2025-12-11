import BrowserWindow from './index';

export default function IframeWindow({url}: {url: string}) {
  return (
    <div className="w-full">
      <BrowserWindow
        url={url}
        className="min-w-min(100%,45vw) w-full max-w-full overflow-hidden"
        bodyClassName="p-0"
      >
        <iframe
          src={url}
          title={url}
          className="block w-full h-80"
        />
      </BrowserWindow>
    </div>
  );
}
