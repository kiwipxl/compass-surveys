import path from 'path';
import { fileURLToPath } from 'url';

// __filename and __dirname are not yet supported by node ESM (see the below links).
// We can replicate them by doing the following, however.
// https://github.com/nodejs/help/issues/2907
// https://nodejs.org/api/esm.html#esm_no_filename_or_dirname
// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = path.dirname(__filename);
