import { DevTools } from 'jotai-devtools';
import css from 'jotai-devtools/styles.css?inline';

function JotaiDevTools() {
  return import.meta.env.DEV ? (
    <>
      <style>{css}</style>
      <DevTools />
    </>
  ) : null;
}

export default JotaiDevTools;
